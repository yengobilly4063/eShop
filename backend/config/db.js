import mongoose from "mongoose"

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, 
      {useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
      })
      console.log(`MongoDB connection established: ${conn.connection.host}`.cyan.underline)
  }catch(err){
    console.error(`DB Conn error: ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB