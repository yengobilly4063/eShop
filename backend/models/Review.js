import mongoose from "mongoose"
const {Schema} = mongoose

const reviewSchema = new Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
},{
  timestamps: true
})

export default reviewSchema