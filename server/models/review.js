const mongoose = require("mongoose")
const {Schema} = mongoose

const reviewTable = new Schema({
    gigID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }, 
    ratingStars: {
        type: Number,
        default: 0, 
        enum: [1,2,3,4,5],
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", reviewTable);