import DisplayItems from '../components/DisplayItems'

const DisplayItemsPage = ({ userData }) => {
  console.log(userData)
  return (
    <div>
      <h1>Display Items as a Grid</h1>
      <DisplayItems userData={userData} />
    </div>
  )
}

export default DisplayItemsPage
