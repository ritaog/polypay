import { Link } from 'react-router-dom'

const StripeSuccess = () => {
  return (
    <div>
      <h1>Successful onboarding!</h1>
      <p>Congratulations, you have been successfully authenticated!</p>
      <Link to="/">
        <button>Home Page</button>
      </Link>
    </div>
  )
}

export default StripeSuccess
