
import PhotoUpload from "../components/PhotoUploadForm"


const SchedulePostPage = ({userData}) => {
  console.log(userData)
  return (
    <div>
      <h1>Schedule A Post:</h1>
      <PhotoUpload userData={userData}/>
    </div>
  )
}

export default SchedulePostPage
