import express from 'express'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'
import fetch from 'node-fetch'
import Media from '../models/mediaModel.js'
import { findMediaAndDelete, findUserById } from '../models/controller.js'

const router = express.Router()

// POST endpoint || Receives the saleItem object and the file to be uploaded to cloudinary, returns saleItem object with image url
router.post('/upload', upload.single('image'), async (req, res) => {
  // sends file sent from front end to be uploaded to instagram to cloudinary. uses cloudinary upload config in "../utils/cloudinary.js"
  const result = await cloudinary.uploader.upload(req.file.path)

  // parses received formData from front end and parses to JSON
  const newMedia = JSON.parse(req.body.formData)

  // adds the secure url the is return in 'result' from cloudinary
  newMedia.photos[0] = result.secure_url

  // adds saleItem object (all important information for sale on instagram) to the SaleItem constructor from "../models/saleItemModel"
  const newData = await new Media(newMedia)

  // saves "newData" to the saleItems collection in database
  const newItem = await newData.save()

  console.log('newItem', newItem)

  // await findUserAndUpdate(postItem.vendorId, updatedSaleItems)

  // sends result from database back to front end
  res.status(200).json(newItem)
})

// GET endpoint || description: localhost:5000/media/getInstagramPostsByLoggedInUser
router.get('/getInstagramPostsByLoggedInUser/:id', async (req, res) => {
  const userId = req.params.id
  const userData = await findUserById(userId)
  try {
    const resUserInfo = await fetch(
      `https://graph.facebook.com/v12.0/${userData.instagramBusinessId}?fields=username,followers_count,profile_picture_url&access_token=${userData.permanentToken}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const resUserInfoJson = await resUserInfo.json()

    const resPosts = await fetch(
      `https://graph.facebook.com/v12.0/${userData.instagramBusinessId}/media?fields=caption,comments_count,like_count,permalink,owner,timestamp,username,media_url,is_comment_enabled&access_token=${userData.permanentToken}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const resPostsJson = await resPosts.json()
    // console.log('resPostsJson', resPostsJson)

    const postsWithComments = resPostsJson.data.map(async (post) => {
      const postComments = await fetch(
        `https://graph.facebook.com/v12.0/${post.id}/comments?fields=from,like_count,replies,text,timestamp,id&access_token=${userData.permanentToken}`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const postCommentsJson = await postComments.json()
      post.comments = postCommentsJson.data
      return post
    })
    Promise.all(postsWithComments).then((values) => {
      const instaData = {
        userData: resUserInfoJson,
        postData: values,
      }
      res.status(200).send(instaData)
    })
  } catch (e) {
    console.log('error', error)
  }
})

// POST endpoint || description: localhost:5000/media/replyToInstagramComment
router.post('/reply', async (req, res) => {
  const postReply = await fetch(
    `https://graph.facebook.com/v12.0/${req.query.comment_id}/replies?message=${req.query.message}&access_token=${req.query.user_id}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  const postReplyJson = await postReply.json()
  console.log('postReply', postReply.statusText)
  if (postReply.statusText === 'OK') {
    res.status(201).json(postReplyJson)
  } else {
    res.sendStatus(400)
  }
})

// GET endpoint || description: localhost:5000/media/listImagesBLoggedUser
router.get('/listImagesByLoggedUser', async (req, res) => {
  const userId = req.user.id
  const mediaArray = await Media.find({ vendorId: userId })
  res.json(mediaArray)
})

// DELETE endpoint || description: localhost:5000/media/deleteImageById
router.delete('/deleteImageById/:id', async (req, res) => {
  const imageId = req.params.id
  console.log('imageId', imageId)
  const media = await findMediaAndDelete(imageId)
  res.status(204).send({ deletedMedia: media })
})

export default router
