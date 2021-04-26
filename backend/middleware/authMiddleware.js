import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async (req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
      token = req.headers.authorization.split(" ")[1]

      const decoded =jwt.verify(token, process.env.JWT_SECRETE_KEY)

      req.user = await User.findById({_id: decoded.id}).select("-password")
      next()
    }catch(error){
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }
  if(!token){
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

export {protect}