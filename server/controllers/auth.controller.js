const User = require('../models/user.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { generateOTP,verificationEmail, verifyEmailTemplate, forgotPasswordTemplate } = require('../utilities/otp.js');
const Verification = require('../models/gmailVerification.js');
const { isValidObjectId } = require('mongoose');
const ForgetPasswordToken = require('../models/forgetPassword.js');
const crypto = require("crypto")




const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email, verified: true });
        if (existingUser) {
            return res.status(409).send("Email already registered.");
        }
        const existingUsername = await User.findOne({ username: req.body.username, verified: true });
        if (existingUsername) {
            return res.status(410).send("Username already taken.");
        }
        
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash
        });

        // Gmail Verification :-
        const OTP = generateOTP();
        const verificationToken = new Verification(
            {
                owner: newUser._id,
                token: bcrypt.hashSync(OTP, 5)
            }
        )
      
        await verificationToken.save()
        
        verificationEmail().sendMail(
            {
                from: process.env.email,
                to: newUser.email,
                subject: 'Verify Your Email Account!',
                html: verifyEmailTemplate(OTP)
            }
        )

        await newUser.save();
        const token = jwt.sign({
            id: newUser._id,
            isSeller: newUser.isSeller,
            email: newUser.email, 
            username: newUser.username
        }, process.env.JWT_KEY);  
        
      
        const {password, ...info} = newUser._doc
        res.cookie("authToken", token, { httpOnly: true, secure: true }).status(200).send(info);
    } catch (err) {
        res.status(500).send("Error Occurred: " + err);
    }
};



const login = async (req,res) => {
    try {
        const user = await User.findOne({ username: req.body.username, verified: true })
        if (!user) return res.status(404).send("User Not Found!!")

        const matches = bcrypt.compareSync(req.body.password, user.password)
        if (!matches)return res.status(400).send("Incorrect Password or Username.")

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY)
        const {password, ...info} = user._doc
        res.cookie("authToken", token, { httpOnly: true }).status(200).send(info);
    }
    catch (err) {
        res.status(500).send("Something Went Wrong.");
    }
};

const logout = async (req, res) => {
    res.clearCookie("authToken", {
        sameSite: "none", // to reach our cookies since server and client aren't on same site
        secure: true
    }).status(200).send('User logged out successfully.')
}; 

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });

        if (!user || !user.verified) {
            return res.status(404).send('User not found');
        }

       
        const hash = bcrypt.hashSync(password, 5);

        // Update user's password
        user.password = hash;
        await user.save();

        res.status(200).send('Password reset successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password');
    }
};


const emailVerification = async (req, res) => {
    const { userID, verificationCode } = req.body;
    console.log(userID, verificationCode)
    if (!isValidObjectId(userID)) {
         return res.status(206).send('Invalid User ID.');
     }
    const user = await User.findById(userID);
        if (!user) {
            return res.status(410).send('User not found');
        }
    const token = await Verification.findOne({ owner: user._id })
    if (!token) {
        return res.status(404).send('Token not found');
    }
    const matches = await token.compareToken(verificationCode)
    if (!matches) {
        return res.status(401).send('Enter the valid code.');
    }
    user.verified = true;

    await Verification.findByIdAndDelete(token._id)
    await user.save()


     verificationEmail().sendMail(
            {
                from: process.env.email,
                to: user.email,
                subject: 'Welcome Email',
                html: `<h1>Welcome to our platform.</h1>`
            }
     )
    return res.status(200).send(user)
}


const forgotPassword = async (req, res) => {
    const { email } = req.body
     if (!email) {
            return res.status(404).send('User with the given email not found');
     }
    const user = await User.findOne({ email });
     if (!user) {
            return res.status(404).send('User not found');
     }
    const token = await ForgetPasswordToken.findOne({ owner: user._id })
    if (token) {
            return res.status(210).send('Next token will be sent after 30 mins.');
    }
    const code = crypto.randomBytes(64).toString('hex')
    const forgetPasswordtoken = new ForgetPasswordToken({
        owner: user._id,
        token: code
    })
    await forgetPasswordtoken.save()
      verificationEmail().sendMail(
            {
                from: process.env.email,
                to: user.email,
                subject: 'Change Password Link',
                html: forgotPasswordTemplate(`http://localhost:5173/resetForgottenPassword?token=${code}&id=${user._id}`)
            }
      )
    res.status(200).send('Reset Password Link sent successfully.')
}

const resetForgottenPassword = async (req,res) => {
    const { password } = req.body
    const user = await User.findById(req.user._id)
    if (!user) {
         return res.status(404).send('User not found.');
    }
    const checkPassword = await user.comparePassword(password)
    console.log("checkPassword:", checkPassword); 
     if (checkPassword) {
         return res.status(401).send('Enter a different password.');
     }
    if (password.trim().length < 8 || password.trim().length > 12)
    {
        return res.status(201).send('Password must be 8-12 characters long.');
    }
    user.password = bcrypt.hashSync(password.trim(), 5)
    await user.save()

    await ForgetPasswordToken.findOneAndDelete({ owner: user._id })
    verificationEmail().sendMail(
            {
                from: process.env.email,
                to: user.email,
                subject: 'Password Changed Successfully!',
                html: '<h1>You can now login with new password.</h1>'
            }
      )
    res.status(200).send('Password Changed Successfully')
}

module.exports = { register, login, logout, resetPassword, emailVerification, forgotPassword, resetForgottenPassword };

