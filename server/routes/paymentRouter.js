import express from 'express'
import stripe from 'stripe'
import bodyParser from 'body-parser'
import SaleItem from '../models/saleItemModel.js'
import User from '../models/userModel.js'

const router = express.Router()

const stripeConfig = stripe(process.env.STRIPE_PRIVATE_KEY)

//Ensure the source of  webhook request is Stripe
const endpointSecret =
  'whsec_9fc5802202cb8abcc1b50ae0c696c3ae314c54071a6b0e7d1eb70b52a396722a'

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
  let storeItem
  const purchaseInfo = req.body
  const productsInfo = purchaseInfo.map(async (item) => {
    storeItem = await SaleItem.findById(item.id)

    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: storeItem.postTitle,
          tax_code: 'txcd_99999999',
        },

        unit_amount: storeItem.price * 100,
        tax_behavior: 'exclusive',
      },
      quantity: item.purchaseQuantity,
    }
  })

  const listOfPurchasedItems = await Promise.all(productsInfo)

  const user = await User.findById(storeItem.vendorId)

  //application fee for PolyPay is 5% (0.05)
  const totalApplicationFee = listOfPurchasedItems.reduce((acc, curr) => {
    return acc + 0.05 * curr.price_data.unit_amount * curr.quantity
  }, 0)

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
            tax_behavior: 'exclusive',
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
            tax_behavior: 'exclusive',
          },
        },
      ],
      mode: 'payment',
      line_items: listOfPurchasedItems,
      automatic_tax: {
        enabled: true,
      },
      success_url: `${process.env.CLIENT_URL}/successfulCheckout`,
      cancel_url: `${process.env.CLIENT_URL}/failedCheckout`,
      payment_intent_data: {
        application_fee_amount: totalApplicationFee,
        transfer_data: {
          destination: user.stripeAccountId,
        },
      },

      metadata: {
        item_id: storeItem.id,
        vendor_id: storeItem.vendorId,
        vendor_name: storeItem.vendorName,
        item_sold: storeItem.postTitle,
        polypay_fee: totalApplicationFee,
      },
    })
    console.log('This is the storeItem', storeItem)
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

//POST Endpoint || description: "http://localhost:5000/payment/webhook"

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event

    //Verify that this request is coming from Stripe
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature']

      try {
        event = stripeConfig.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        )
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message)
        return response.sendStatus(400)
      }
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object

        const checkoutSessionData = {
          sessionId: session.id,
          total_amount: session.amount_subtotal,
          customer_email: session.customer_details.email,
          customer_name: session.shipping.name,
          customer_address: session.shipping.address,
          data_on_item_sold: session.metadata,
          payment_status: session.payment_status,
          shipping_amount: session.total_details.amount_shipping,
        }
        console.log('metadata from checkout', checkoutSessionData)

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      case 'payment_method.attached':
        const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`)
    }

    // Return a 200 response to acknowledge receipt of the event

    response.send()
  }
)

export default router
