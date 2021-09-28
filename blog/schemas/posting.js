const mongoose = require("mongoose");
const { Schema } = mongoose;
const postingSchema = new Schema({
    postingId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
    },
    name: {
        type: String
    },
    password: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model("Posting", postingSchema)