import mongoose from "mongoose"
import {Schema} from "mongoose"

const reviewSchema = new Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
},{
  timestamps: true
})

export default reviewSchema