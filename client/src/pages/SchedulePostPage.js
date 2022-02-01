
import PhotoUpload from "../components/PhotoUploadForm"
import SaleListUser from "../components/ui/SaleListUser"


const SchedulePostPage = ({userData}) => {
  console.log(userData)
  return (
    <div>
      <h1>Schedule A Post:</h1>
      <SaleListUser userData={userData}/>
      <PhotoUpload userData={userData}/>
    </div>
  )
}

export default SchedulePostPage
