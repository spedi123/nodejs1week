const mongoose = require("mongoose")

const { Schema } = mongoose
const commentSchema = new Schema({
    
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  postingId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Comments", commentSchema)