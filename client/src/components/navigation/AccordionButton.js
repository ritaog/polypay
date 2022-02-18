import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PhotoIcon from '@mui/icons-material/Photo'
import AddIcon from '@mui/icons-material/Add'
import { ListItemText } from '@mui/material'
import { List, ListItem } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function CustomizedAccordions({open}) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ padding: '0px' }}
        >
          <PostAddIcon />
          <Typography sx={{ paddingLeft: '35px' }}>Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate('/schedule-post')
              }}
            >
              <AddIcon />
              <ListItemText
                primary="Schedule Post"
                sx={{ paddingLeft: '10px' }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate('/media-library')
              }}
            >
              <PhotoIcon />
              <ListItemText
                primary="Media Library"
                sx={{ paddingLeft: '10px' }}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ padding: '0px' }}
        >
          <SupervisorAccountIcon />
          <Typography sx={{ paddingLeft: '35px' }}>Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate('/link-accounts')
              }}
            >
              <AccountBoxIcon />
              <ListItemText
                primary="Link Profiles"
                sx={{ paddingLeft: '35px' }}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ padding: '0px' }}
        >
          <ReceiptIcon />
          <Typography sx={{ paddingLeft: '35px' }}>Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
