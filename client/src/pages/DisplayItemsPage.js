import SaleListGuest from '../components/ui/SaleListGuest'
import { useParams } from 'react-router-dom'

const DisplayItemsPage = ({ setVendorName }) => {
  const profileId = useParams()
  // console.log('profileId', profileId.id)
  return (
    <div style={{ padding: '0px' }}>
      <SaleListGuest profileId={profileId.id} setVendorName={setVendorName} />
    </div>
  )
}

export default DisplayItemsPage
