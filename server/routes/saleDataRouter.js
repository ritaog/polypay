import express from 'express'
import fetch from 'node-fetch'
import SaleItem from '../models/saleItemModel.js'
import SaleData from '../models/saleDataModel.js'
import User from '../models/userModel.js'
import {
  findUserAndUpdate,
  findSaleItemAndUpdate,
  findSaleItemAndDelete,
  findMediaAndUpdate,
} from '../models/controller.js'
import saleData from '../models/saleDataModel.js'

const router = express.Router()

router.post('/saveSaleData', async (req, res) => {
  const saleItem = req.body
  const newSaleData = new SaleData(saleItem)
  const savedData = await newSaleData.save()
  res.status(201).json(savedData)
})

router.get('/listSaleDataByLoggedUser', async (req, res) => {
  const userId = req.user.id
  const saleArray = await SaleData.find({ vendorId: userId })
  res.status(202).json(saleArray)
})

export default router
