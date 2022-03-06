import SaleListGuest from '../components/ui/SaleListGuest'
import { useParams } from 'react-router-dom'

const DisplayItemsPage = ({ setVendorName }) => {
  const profileId = useParams()
  return (
    <div style={{ padding: '0px' }}>
      <SaleListGuest profileId={profileId} setVendorName={setVendorName} />
    </div>
  )
}

export default DisplayItemsPage
