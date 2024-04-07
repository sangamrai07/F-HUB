const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const { Schema } = mongoose


const verificationTable = new Schema({
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

verificationTable.methods.compareToken = async function (token) {
    const result =  bcrypt.compareSync(token, this.token);
    return result;
};

module.exports = mongoose.model("Verification", verificationTable);