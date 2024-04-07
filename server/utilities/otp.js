const nodemailer = require('nodemailer')
const generateOTP = () => {
    otp = ''
            for (let i = 0; i < 3; i++){
                const random = Math.round(Math.random() * 9)
                otp = otp+random
            }
            return otp;
}

const verificationEmail = () => {
   var transport = nodemailer.createTransport({
   service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass
  }
   });
    return transport;
}
        
const verifyEmailTemplate = (code) => {
    return `<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .verification-code {
            background-color: #f9f9f9;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        @media screen and (max-width: 600px) {
            .container {
                width: 100%;
                margin: 0 auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Thank you for registering! To complete your registration, please verify your email address by entering the following code:</p>
        <div class="verification-code">
            <p style="font-size: 24px; margin: 0;">${code}</p>
        </div>
        <p>If you didn't request this verification, you can ignore this email.</p>
        <p>Thank you,<br>FreeLance-Hub Team</p>
    </div>
</body>
</html>   `
}

        
const forgotPasswordTemplate = (url) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #666;
                    line-height: 1.6;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                @media screen and (max-width: 600px) {
                    .container {
                        width: 100%;
                        margin: 0 auto;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Forgot Password</h1>
                <p>You've requested to reset your password. Click the button below to reset it:</p>
                <a href="${url}" class="button">Reset Password</a>
                <p>If you didn't request a password reset, you can ignore this email.</p>
                <p>Thank you,<br>Freelance-Hub Team</p>
            </div>
        </body>
        </html>
    `;
};



module.exports = {generateOTP, verificationEmail, verifyEmailTemplate, forgotPasswordTemplate}