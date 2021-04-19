import express from "express"
const router = express.Router()
import Product from "../models/Product.js"
import asyncHandler from "express-async-handler"

// @desc    Fetch all products
// @route   GET /api/products
// @access  public 
router.get("/", asyncHandler(async (req, res) => {
  const products = await Product.find({ })
  res.json(products)
}))

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public 
router.get("/:id", asyncHandler(async (req, res) => {
  const product = await Product.findById({_id: req.params.id})
  if(product){
    res.json(product)
  }else {
    res.status(404).json({message: `Produc with id:${req.params.id} not found!`})
  }
}))

export default router
