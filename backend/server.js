import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

import {notFound, errorHandler } from "./middleware/errorMidleware.js"

//Connect to ENV variables
dotenv.config()

//Connection to DB
connectDB()

//Initialise express server
const app = express()

// Log every request in development mode but not in production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"))
}

//Parse json body from frontend
app.use(express.json());

//Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

// ERROR & NotFound Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))