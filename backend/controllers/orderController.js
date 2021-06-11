import Order from "../models/Order.js"
import asyncHandler from "express-async-handler"

// @desc    Create new Order
// @route   POST /api/orders
// @access  private 
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    user,
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice
  } = req.body

    if(orderItems && orderItems.length === 0){
      res.status(400)
      throw new Error("No order Items")
    }else{
      const order = new Order({
        orderItems, 
        user,
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
})