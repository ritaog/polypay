import express from 'express'
import stripe from 'stripe'
import SaleItem from '../models/saleItemModel.js'

const router = express.Router()
const stripeConfig = stripe(process.env.STRIPE_PRIVATE_KEY)

//POST end-point || description: http://localhost:5000/payment/checkout-session
router.post('/checkout-session', async (req, res) => {
  const items = [{ id: '61fc3167989a4f40e80223bd', quantity: 2 }]

  req.body = items

  try {
    const session = await stripeConfig.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(async (item) => {
        const storeItem = await SaleItem.findById(item.id)
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: storeItem.postTitle,
            },
            unit_amount: storeItem.price * 100,
          },
          quantity: item.quantity,
        }
      }),

      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    console.log({ url: session.url })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
