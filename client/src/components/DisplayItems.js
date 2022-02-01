
import './DisplayItem.css'
import SaleListUser from './ui/SaleListUser'
import SaleListGuest from './ui/SaleListGuest'

const DisplayItems = ({ userData, profileId }) => {
  console.log('userData', userData);
  console.log('profileId', profileId);
  return (
    <div>
      {(profileId && !userData) ? (
        <SaleListUser userData={userData} />
        ) : (
        <SaleListGuest profileId={profileId} />
      )}
    </div>
  )
}

export default DisplayItems
