import User from './userModel.js'
import SaleItem from './saleItemModel.js'
import Media from './mediaModel.js'
import SaleData from './saleDataModel.js'

// Controller for Data Models

// USER FUNCTIONS

export async function findUserByEmail(email) {
  let profile = await User.findOne({ emailAddress: email })
  return profile
}

export async function findUserById(id) {
  try {
    let user = await User.findById(id)
    return user
  } catch (e) {
    console.log(e)
  }
}

export async function findUserAndUpdate(id, userData) {
  let updatedUser = await User.findByIdAndUpdate(id, userData)
  return updatedUser
}

// SALE ITEM FUNCTIONS

export async function findSaleItemById(id) {
  let saleItem = await SaleItem.findById(id)
  return saleItem
}

export async function findSaleItemAndUpdate(id, saleItemData) {
  let updatedSaleItem = await SaleItem.findByIdAndUpdate(id, saleItemData)
  return updatedSaleItem
}

export async function findSaleItemAndDelete(id) {
  let deletedSaleItem = await SaleItem.findByIdAndDelete(id)
  return deletedSaleItem
}

// MEDIA FUNCTIONS

export async function findMediaAndDelete(id) {
  let deletedSaleItem = await Media.findByIdAndDelete(id)
  return deletedSaleItem
}

export async function findMediaAndUpdate(id, mediaData) {
  let updatedMedia = await Media.findByIdAndUpdate(id, mediaData)
  return updatedMedia
}

export async function findAllUser() {
  let allUser = await User.find({})
  console.log("in controller", allUser)
  return allUser
}

// SALE DATA FUNCTIONS

export async function findSaleDataAndUpdate(id, updateData) {
  let updatedSaleData = await SaleData.findByIdAndUpdate(id, updateData)
  return updatedSaleData
}

export async function findSaleDataAndDelete(id) {
  let deletedSaleData = await SaleData.findByIdAndDelete(id)
  return deletedSaleData
}