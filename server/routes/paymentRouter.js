import express from 'express'
import stripe from 'stripe'
import SaleItem from '../models/saleItemModel.js'
import User from '../models/userModel.js'

const router = express.Router()

const stripeConfig = stripe(process.env.STRIPE_PRIVATE_KEY)

//POST Endpoint || description: "http://localhost:5000/payment/onboardVendorToStripe"

router.post('/onboardVendorToStripe', async (req, res) => {
  const { emailAddress } = req.body

  const user = await User.findOne({ emailAddress: emailAddress })

  if (!user) {
    return res.status(400).send('User was not found')
  }

  //if user is found create account link to redirect user to
  const accountLink = await stripeConfig.accountLinks.create({
    account: user.stripeAccountId,
    refresh_url: 'http://localhost:3000/failure',
    return_url: 'http://localhost:3000/success',
    type: 'account_onboarding',
  })
  console.log('This is the linking url', accountLink.url)
  res.send(accountLink.url)
})

// creating login link to view payment dashboard
//POST Endpoint || description: "http://localhost:5000/payment/createLoginLink"
router.post('/createLoginLink', async (req, res) => {
  const userId = req.body._id
  const user = await User.findById(userId)

  const { stripeAccountId } = user

  if (!stripeAccountId) {
    return res
      .status(400)
      .send('No stripe account exists against your account.')
  }

  // else
  try {
    const loginLink = await stripeConfig.accounts.createLoginLink(
      stripeAccountId
    )
    //redirect_url: 'http://localhost:3000/success'
    res.send(loginLink)
  } catch (err) {
    console.log(`Error: ${err}`)
  }
})

//POST end-point || description: http://localhost:5000/payment/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  const productsInfo = req.body.map(async (item) => {
    const storeItem = await SaleItem.findById(item.id)

    console.log('storeItem', storeItem)

    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: storeItem.postTitle,
        },

        unit_amount: storeItem.price * 100,
      },
      quantity: item.purchaseQuantity,
    }
  })

  const listofProducts = await Promise.all(productsInfo)
  console.log('results', listofProducts)

  try {
    const session = await stripeConfig.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'cad',
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 700,
              currency: 'cad',
            },
            display_name: 'Next day air',
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
      mode: 'payment',
      line_items: listofProducts,
      success_url: `${process.env.CLIENT_URL}/successfulCheckout`,
      cancel_url: `${process.env.CLIENT_URL}/failedCheckout`,
    })
    console.log({ url: session.url })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
