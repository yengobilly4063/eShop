import express from "express"
import colors from "colors"
import dotenv from  "dotenv"
import connectDB from "./config//db.js"
import productRoutes from "./routes/productRoutes.js"

//Connect to ENV variables
dotenv.config()

//Connection to DB
connectDB()

//Initialise express server
const app = express()

//Routes
app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))