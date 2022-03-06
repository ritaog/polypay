import express from 'express'
import fetch from 'node-fetch'
import SaleItem from '../models/saleItemModel.js'
import SaleData from '../models/saleDataModel.js'
import User from '../models/userModel.js'
import {
  findUserAndUpdate,
  findSaleDataAndUpdate,
  findSaleDataAndDelete,
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

router.put('/updateSaleDataByIds', async (req, res) => {
  const incomingData = req.body
  const updatedData = incomingData.ids.map(async (id) => {
    const newSaleData = await findSaleDataAndUpdate(id, {
      fulfilled: incomingData.fulfilled,
    })
    return newSaleData
  })
  Promise.all(updatedData).then((values) => {
    res.sendStatus(201)
  })
})

// router.delete('/deleteSaleDataByIds', async (req, res) => {
//   const incomingData = req.body
//   console.log('incomingData', req)
  // const deletedData = incomingData.map(async (id) => {
  //   const deletedId = await findSaleDataAndDelete(id)
  //   return deletedId
  // })
  // Promise.all(deletedData).then((values) => {
  //   console.log('values', values)
  //   res.status(204).send(values)
  // })
// })

export default router
