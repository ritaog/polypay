

import DisplayItems from '../components/DisplayItems'
import { useParams } from 'react-router-dom'

const DisplayItemsPage = ({ userData, guest }) => {
  const profileId = useParams()


  return (
    <div>
      {/* <h1>Display Items as a Grid</h1> */}
      <DisplayItems userData={userData} profileId={profileId} guest={guest}/>
    </div>
  )
}

export default DisplayItemsPage
