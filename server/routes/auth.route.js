const express = require("express");
const {register,login,logout, resetPassword, emailVerification, forgotPassword, resetForgottenPassword} = require('../controllers/auth.controller.js');
const { validateForgetPassToken } = require("../utilities/tokenValidator.js");
const router = express.Router();

router.post("/register", register)
router.post("/verifyEmail",emailVerification)
router.post("/login",login)
router.post("/logout", logout)
router.patch("/resetPassword", resetPassword)
router.post("/forgetPassword", forgotPassword)
router.get("/validateToken", validateForgetPassToken, (req, res) => {
    res.json({success: true})
})
router.post("/resetForgottenPassword", validateForgetPassToken, resetForgottenPassword)


module.exports = router;