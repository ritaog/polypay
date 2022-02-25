import LinkStripeCard from '../components/ui/LinkStripeCard'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const SetUpStripePage = ({ userData }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <div>
      <Box spacing={1} sx={{ width: '100%' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          rowSpacing={1}
          sx={{ padding: '0 300px 0 300px' }}
        >
          <Grid item xs={8}>
            <Item sx={{ margin: '10px' }}>
              <LinkStripeCard userData={userData} />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div></div>
    </div>
  )
}

export default SetUpStripePage
