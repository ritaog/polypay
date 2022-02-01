
import './DisplayItem.css'
import SaleListUser from './ui/SaleListUser'
import SaleListGuest from './ui/SaleListGuest'

const DisplayItems = ({ userData, profileId, guest }) => {
  return (
    <div>
      {(guest) ? (
        <SaleListGuest profileId={profileId} />
        ) : (
        <SaleListUser userData={userData} />
      )}
    </div>
  )
}

export default DisplayItems
