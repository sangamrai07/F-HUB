const mongoose = require("mongoose")
const {Schema} = mongoose

const gigTable = new Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
    ratingStars: {
        type: Number,
        default: 0,   
    },
        sales: {
      type: Number,
      default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
     category: {
        type: String,
        required: true,
    },
     revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    coverImg: {
        type: String,
        required: false,
         },
    deliveryTime: {
        type: String,
        required: true,
    },
     serviceTitle: {
        type: String,
        required: false,
    },
      shortDesc: {
        type: String,
        required: false,
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model("Gig", gigTable);