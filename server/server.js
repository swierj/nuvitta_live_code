const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.static(process.env.STATIC_DIR))

const stripe = require('stripe')(process.env.STRIPE_SK)

const testDOMAIN = 'http://localhost:3000'

//i dont think I need this
/* app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html')
  res.sendFile(path)
}) */

// add try catch
app.post('/create-checkout-session', async (req, res) => {
  const items = req.body.items
  let lineItems = []
  // adding cart item data to the lineItems array for the format that stripe wants
  items.forEach((item) => {
    lineItems.push({
      price_data: {
        currency: 'usd',
        unit_amount: item.price,
        product_data: {
          name: item.name,
        },
      },
      quantity: item.amount,
    })
  })
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: lineItems,
    mode: 'payment',
    return_url: `${process.env.DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    billing_address_collection: 'required',
    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    custom_text: {
      submit: {
        message:
          'You will recieve a payment reciept and confirmation in your email.',
      },
    },
  })

  res.send({ clientSecret: session.client_secret })
})

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  })
})

app.listen(5000, console.log('Running on port 5000.'))
