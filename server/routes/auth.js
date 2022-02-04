import express from 'express'
import fetch from 'node-fetch'
import {
  findUserByEmail,
  findUserById,
  findUserAndUpdate,
} from '../models/controller.js'
const router = express.Router()

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

// Authentication Server Routes

// passport middle ware runs when the '/login' endpoint is called
passport.use(
  // creates local strategy constructor for passport to authenticate user
  new LocalStrategy(
    // usernameField => tells passport to look for username in 'emailAddress' in User object
    // passwordField => tells passport to look for password in 'password' in User object
    {
      usernameField: 'emailAddress',
      passwordField: 'password',
    },
    // function call from passport receives username and password from inputs on front end
    function (username, password, done) {
      console.log('passport is trying to verify user', username)
      // calls User model controller and finds user by email and compares 'usernameField' and 'passwordField' with User object
      findUserByEmail(username)
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

// passport middle ware creates a cookie and saves it in the browser
passport.serializeUser(function (user, done) {
  console.log('passport wants to store this user in a cookie', user)
  done(null, user.id)
})
// passport middle ware checks if there is a cookie saved in the browser and returns logged in user
passport.deserializeUser(function (id, done) {
  console.log('passport is trying to recover the user from a cookie')
  findUserById(id)
    .then((user) => {
      if (!user) {
        done(new Error('email not found or it was deleted'))
        return
      }
      done(null, user)
    })
    .catch(done)
})

// POST Endpoint || login endpoint, uses the passport middle above, to authenticate if username and password from log in matches user in database
router.post(
  '/login',
  passport.authenticate('local'),
  async function (req, res) {
    console.log(req.user)
    res.send(req.user)
  }
)

// GET endpoint || endpoint logs out user
router.get('/logout', function (req, res) {
  console.log('get server logout')
  req.logout()
  res.redirect('/')
})

// GET endpoint || when endpoint is called checks for user cookie in browser and returns user if there is
router.get('/getLoggedInUser', async function (req, res) {
  res.send(req.user)
})

// POST endpoint || this endpoint is used to connect users facebook account and generate a permanent token for instagram graph api calls
router.post('/validateFb', async function (req, res) {
  let data = req.body

  // first api call sends temporary access token generated in front end by "react-facebook-login" library. sent to back end in req.body
  // response1 api returns user data of facebook user, as well as linked instagram page ids
  const response1 = await fetch(
    `https://graph.facebook.com/v12.0/me/accounts?access_token=${data.response.accessToken}`
  )

  // response1 is converted to json for next api call
  const instaPageId = await response1.json()

  // second api call sends instagram page id from response1 and temp access token and receives data on linked instagram page
  // instagram business ID is pulled from response2
  const response2 = await fetch(
    `https://graph.facebook.com/v12.0/${instaPageId.data[0].id}?fields=instagram_business_account&access_token=${data.response.accessToken}`
  )

  // response2 is converted to json for next api call
  const instaBusiId = await response2.json()

  // last api call exchanges temporary token for a permanent token. FB_APP_ID and FB_SECRET are from registered app at "https://developers.facebook.com/"
  const response3 = await fetch(
    `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_SECRET}&fb_exchange_token=${data.response.accessToken}`
  )

  // response3 is converted to json to read permanent token
  const permToken = await response3.json()

  // instaAccess is the two results needed to make future api calls with instagram graph api the business id of the instagram page and the permamnent access token for the user
  const instaAccess = {
    instagramBusinessId: instaBusiId.instagram_business_account.id,
    permanentToken: permToken.access_token,
  }

  // user is updated in the database
  const updatedUser = await findUserAndUpdate(data.userData._id, instaAccess)

  // updated user is sent back to the front end
  res.json(updatedUser)
})

export default router
