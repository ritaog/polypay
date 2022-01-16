import express from 'express'
import fetch from 'node-fetch'
const router = express.Router()

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import VendorProfile from '../models/vendorFunctions.js'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'emailAddress',
      passwordField: 'password',
    },
    function (username, password, done) {
      console.log('passport is trying to verify user', username)
      VendorProfile.findUserByEmail(username)
        .then((user) => {
          if (!user || user.password !== password) {
            done(null, false, { message: 'Incorrect username/password.' })
            return
          }
          done(null, user)
        })
        .catch(done)
    }
  )
)

passport.serializeUser(function (user, done) {
  console.log('passport wants to store this user in a cookie', user)
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  console.log('passport is trying to recover the user from a cookie')
  VendorProfile.findById(id)
    .then((user) => {
      if (!user) {
        done(new Error('email not found or it was deleted'))
        return
      }
      done(null, user)
    })
    .catch(done)
})

router.post('/login',passport.authenticate('local'), async function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user)
  }
)

router.post('/validateFb', async function (req, res) {
  let data = req.body

  let response1 = await fetch(
    `https://graph.facebook.com/v12.0/me/accounts?access_token=${data.response.accessToken}`
  )
  let instaPageId = await response1.json()
  let response2 = await fetch(
    `https://graph.facebook.com/v12.0/${instaPageId.data[0].id}?fields=instagram_business_account&access_token=${data.response.accessToken}`
  )
  let instaBusiId = await response2.json()
  let response3 = await fetch(
    `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_SECRET}&fb_exchange_token=${data.response.accessToken}`
  )
  let permToken = await response3.json()  

  const instaAccess = {
    instagramBusinessId: instaBusiId.instagram_business_account.id,
    permanentToken: permToken.access_token
  }

  let updatedUser = await VendorProfile.findUserAndUpdate(data.userData._id, instaAccess)
  res.json(updatedUser)

})

// router.get('/loggedInUser', function (req, res) {
//   res.send(req.user)
// })

export default router
