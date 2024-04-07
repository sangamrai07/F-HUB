const { isValidObjectId } = require("mongoose");
const User = require("../models/user");
const ForgetPasswordToken = require("../models/forgetPassword");

const validateForgetPassToken = async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        return res.status(400).send("Invalid Request.");
    }
    if (!isValidObjectId(id)) {
        return res.status(401).send("Invalid User ID.");
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).send("User not found.");
    }
    const forgetPassToken = await ForgetPasswordToken.findOne({ owner: user._id });
    if (!forgetPassToken) {
        return res.status(404).send("Forget password token not found.");
    }
    const isValid = await forgetPassToken.compareToken(token);
    if (!isValid) {
        return res.status(401).send("Invalid Token");
    }
    req.user = user;
    next();
}

module.exports = { validateForgetPassToken };
