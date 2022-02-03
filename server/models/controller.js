import User from './userModel.js'
import SaleItem from './saleItemModel.js'

// Controller for Data Models

export async function findUserByEmail(email) {
  let profile = await User.findOne({ emailAddress: email })
  return profile
}

export async function findUserById(id) {
  let user = await User.findById(id)
  return user
}

export async function findSaleItemById(id) {
  let saleItem = await SaleItem.findbyId(id)
  return saleItem
}

export async function findUserAndUpdate(id, userData) {
  let updatedUser = await User.findByIdAndUpdate(id, userData)
  return updatedUser
}
