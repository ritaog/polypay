import * as React from 'react'
import InstagramEmbed from 'react-instagram-embed'

// import ImageList from '@mui/material/ImageList'
// import ImageListItem from '@mui/material/ImageListItem'
// import ImageListItemBar from '@mui/material/ImageListItemBar'
// import ListSubheader from '@mui/material/ListSubheader'
// import IconButton from '@mui/material/IconButton'
// import InstagramIcon from '@mui/icons-material/Instagram'

// import axios from 'axios'
// import { useState, useEffect } from 'react'

export default function SaleListUser({userData}) {

  // const [saleItems, setSaleItems] = useState([])

  // useEffect(() => {  
  //   const getSaleItemsByLoggedUser = async () => {
  //     const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
  //     response.data.sort(function (a, b) {
  //       return new Date(b.postTime) - new Date(a.postTime)
  //     })

  //     setSaleItems(response.data)
  //   }
  //   if (userData) {
  //     getSaleItemsByLoggedUser()
  //   }
  // }, [userData])

  return (
    <div>
      <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        clientAccessToken="123|456"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      {/* <ImageList sx={{ width: '100%' }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            {userData ? `${userData.userName}'s Recent Posts` : ''}
          </ListSubheader>
        </ImageListItem>
        {saleItems
          ? saleItems.map((item, index) => (
              <ImageListItem key={item._id + index + 'user'}>
                <img
                  src={`${item.photos[0]}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.photos[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={`Price: $ ${parseFloat(item.price.$numberDecimal)}`}
                  subtitle={'Status: ' + item.available}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InstagramIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          : ''}
      </ImageList> */}
    </div>
  )
}

