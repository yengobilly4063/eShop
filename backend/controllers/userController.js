import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

// @desc    Auth user & get user token
// @route   POST /api/users/login
// @access  public 
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email: email })

  if(user && (await matchPassword(user, password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }else{
    console.log("password comparing failed")
    res.status(401)
    throw new Error("Invalid email or password")
  }

})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  public 
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  private 
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
      user.password = await bcrypt.hash(req.body.password, 10)
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Get all single user
// @route   GET /api/users
// @access  public
const getAllUsers = asyncHandler( async (req, res) => {
  res.json(await User.find())
}) 

// @desc    Create a new User
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler( async (req, res) => {
  const {name, email, password} = req.body

  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    name, 
    email,
    password: await bcrypt.hash(password, 10)
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data")
  }
  
}) 

// Compare password and return true or false
const matchPassword = async (user, enteredPassword) => {
  return await bcrypt.compare(enteredPassword, user.password)
}


export {authUser, getUserProfile, getAllUsers, registerUser, updateUserProfile}