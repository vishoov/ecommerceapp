const router = require('express').Router();
const User = require('../models/user.model');
const { userHome, userLogin, userSignup } = require('../controllers/user.controller');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
const { auth } = require('../middlewares/auth');

router.get('/user', userHome);


//signup
router.post("/signup", userSignup);


//login
router.post("/login", userLogin)


//logout
router.get("/logout", auth,(req, res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });
        res.redirect("/v1/user");

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
    
})

router.get("/users", async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    }
    catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
});

//forgotpassword
router.post("/updatepassword", (req, res)=>{
    try{
        const { email } = req.body;
        const user = User.findOne({email});
        if(!user){
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }
        //send email with token
        //third party apps 
        //nodemailer
        // Generate a token
        // const token = crypto.randomBytes(20).toString('hex');

        // // Save the token to the user's record (assuming you have a field for it)
        // user.resetPasswordToken = token;
        // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        // await user.save();

        // // Create a transporter
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'your-email@gmail.com',
        //         pass: 'your-email-password'
        //     }

        //     // user: help@amazon.in
        //     // pass: password
        // });

        // // Set up email data
        // const mailOptions = {
        //     to: user.email,
        //     from: 'your-email@gmail.com',
        //     subject: 'Password Reset',
        //     text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        //     Please click on the following link, or paste this into your browser to complete the process:\n\n
        //     http://${req.headers.host}/reset/${token}\n\n
        //     If you did not request this, please ignore this email and your password will remain unchanged.\n`
        // };

        // // Send the email
        // transporter.sendMail(mailOptions, (err, info) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             status: "failed",
        //             message: "Error sending email"
        //         });
        //     }
        //     res.status(200).json({
        //         status: "success",
        //         message: "Email sent successfully"
        //     });
        // });

        user.password = password;
        user.save();
        res.status(200).json({
            status: "success",
            message: "Password updated successfully"
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})


//resetpassword
// router.post("/resetpassword/:token", async (req, res)=>{
//     try{
//         const { token} = req.params;
//         const { password } = req.body;
//         const user = User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });
//         if(!user){
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Invalid token"
//             })
//         }

//         user.password = password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         res.status(200).json({
//             status: "success",
//             message: "Password reset successful"
//         })

//     }
//     catch(err){
//         res.status(500).json({
//             status: "failed",
//             message: err.message
//         })
//     }

// })


//profile page
router.get("/profile/:username", async (req, res)=>{
    try{
        const username = req.params.username;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    }
    catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

})

module.exports = router;