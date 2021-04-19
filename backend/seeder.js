import mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import colors from "colors"
import User from "./models/User.js"
import Product from "./models/Product.js"
import Order from "./models/Order.js"
import connectDB from "./config/db.js"

//Get ENV config variables
dotenv.config()

//Connect to DB
connectDB()

const importData = async () => {
  try{
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = await createdUsers.find(user => user.isAdmin === true )
    // const adminUser = await createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return {...product, user: adminUser._id}
    })

    await Product.insertMany(sampleProducts)

    console.log(`Data imported!`.green.inverse)
    process.exit()
  }catch(error){
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try{
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log(`Data Destroyed!`.red.inverse)
    process.exit()
  }catch(error){
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if(process.argv[2] === "-d"){
  destroyData()
}else{
  importData()
}