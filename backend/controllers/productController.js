import Product from "../models/Product.js"
import asyncHandler from "express-async-handler"

// @desc    Fetch all products
// @route   GET /api/products
// @access  public 
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ })
  res.json(products)
})

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  public 
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById({_id: req.params.id})
  if(product){
    res.json(product)
  }else {
    res.status(404)
    throw new Error(`Product with id:${req.params.id} not found!`)
  }
})

export {getProducts, getProductById}