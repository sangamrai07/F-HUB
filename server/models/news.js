const mongoose = require("mongoose")
const {Schema} = mongoose

const newsTable = new Schema({
    userID: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        default: [],   
    },
     description: {
        type: String,
        required: true
    },
     caption: {
        type: String,
        required: true
    },
     likes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("News", newsTable);