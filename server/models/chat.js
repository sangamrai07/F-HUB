const mongoose = require("mongoose")
const {Schema} = mongoose

const chatTable = new Schema({
    allChatsID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }, 
     messages: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Chat", chatTable);