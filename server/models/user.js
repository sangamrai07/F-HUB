const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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
        
    },
    password: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
    ,
    isSeller: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    },
    portfolioImg: {
        type: [String],
        required: false,
        default: []
    },
}, {
    timestamps: true
})

userTable.methods.comparePassword = async function (password) {
    const result =  bcrypt.compareSync(password, this.password);
    return result
}

module.exports = mongoose.model("User", userTable);