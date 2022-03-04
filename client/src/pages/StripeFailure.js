import { Link } from 'react-router-dom'

const StripeFailure = () => {
  return (
    <div>
      <h1>Failure onboarding</h1>
      <p>
        Unfortunately, you have been not been successfully authenticated for
        Stripe payments. It is probably because your redirect link has expired
      </p>
      <Link to="/setup-stripe">
        <button>Try Again</button>
      </Link>

      <Link to="/">
        <button>Home Page</button>
      </Link>
    </div>
  )
}

export default StripeFailure
