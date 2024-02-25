const mongoose = require("mongoose")
const {Schema} = mongoose

const userTable = new Schema({
    image: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
    ,
    isSeller: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userTable);