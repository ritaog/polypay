import User from './UserModel.js'

export async function findUserByEmail(email) {
  let profile = await User.findOne({ emailAddress: email })
  return profile
}

export async function findById(id) {
  let user = await User.findById(id)
  return user
}

export async function findUserAndUpdate(id, userData) {
  let updatedUser = await User.findByIdAndUpdate(id, userData)
  return updatedUser
}

