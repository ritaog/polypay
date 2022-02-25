const StripeSuccessfulCheckout = ({ userData }) => {
  return (
    <div>
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your patronage! If you have any questions, please email
        <a href={`mailto:${userData.emailAddress}`}>{userData.emailAddress}</a>
      </p>
    </div>
  )
}

export default StripeSuccessfulCheckout
