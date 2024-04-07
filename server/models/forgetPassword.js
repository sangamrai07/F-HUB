const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const { Schema } = mongoose


const forgetPasswordSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 1800,
        default: Date.now()
    }
}, {
    timestamps: true
})

forgetPasswordSchema.methods.compareToken = async function (token) {
    return this.token === token;
}

module.exports = mongoose.model("ForgetPasswordToken", forgetPasswordSchema);