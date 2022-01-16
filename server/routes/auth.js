import express from 'express'
const router = express.Router()

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
// import { findUserByEmail } from "../models/vendorProfileModel.js"

import VendorProfile from '../models/vendorProfileModel.js'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'emailAddress',
      passwordField: 'password'
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
  })
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

router.post('/login', passport.authenticate('local'), async function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user)
})

// router.get('/loggedInUser', function (req, res) {
//   res.send(req.user)
// })

export default router
