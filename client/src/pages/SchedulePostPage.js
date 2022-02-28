// import { Grid } from '@mui/material'
import Box from '@mui/material/Box'

// import { useNavigate } from 'react-router-dom'
import MediaLibrary from '../components/ui/MediaLibrary'
import MediaCalender from '../components/ui/MediaCalender'

const SchedulePostPage = ({ userData }) => {
  // const navigate = useNavigate()
  return (
    <Box sx={{display: 'flex'}}>

        <Box sx={{marginRight: '10px', width: "300px"}}>
          <MediaLibrary userData={userData} />
        </Box>

        <Box sx={{marginLeft: '10px', width: '100%'}}>
          <MediaCalender userData={userData} />
        </Box>
    </Box>
  )
}

export default SchedulePostPage
