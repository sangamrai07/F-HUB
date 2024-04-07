const mongoose = require("mongoose")
const {Schema} = mongoose

const jobTable = new Schema({
    userID: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        default: "",   
    },
    skills: {
        type: [String],
        default: [],
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
     description: {
        type: String,
        required: true
    },
     salary: {
        type: String,
        default: "Negotiable",
    },
    location: {
        type: String,
        required: true
    },
      category: {
         type: String,
        required: true
    },
    position: {
          type: [String],
        default: [],
    },
    expiryDate:{
          type: String,
         required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Job", jobTable);