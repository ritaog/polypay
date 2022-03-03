import { Link } from "react-router-dom"

const StripeSuccessfulCheckout = () => {
  return (
    <div>
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your patronage! A receipt has been sent to the email
        address you provided at checkout.
      </p>
      <p>Want to learn more about PolyPay?  Click the button below to visit our home page!</p>
    <Link to = "/">
      <button>PolyPay Home Page</button>
    </Link>
    </div>
  )
}

export default StripeSuccessfulCheckout
