const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate")


// send otp function
exports.sendOTP = async(req,res) => {
    try{
        // fecth email
        const {email} = req.body;

        // check if it is already existing user
        const checkUserPresent = await User.findOne({email});
        
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User already exists...'
            })
        }


        //otp generate
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        }) ;

        // check otp is unique or not?
        const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
        while(result){
            otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
        }

        // creating otp object for otp schema and insert it in db.
        const otpPayLoad = {email,otp};

        console.log(email);

        const otpBody = await OTP.create(otpPayLoad);
        console.log("OTP Body", otpBody);


        // return response
        return res.status(200).json({
            success:true,
            message:'OTP Sent Successfully...',
            otp,
        })



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messages:"unsucccess :(",
            message:error.message
        })
    }
};

// signUp
exports.singUp = async (req,res) => {
    try{

        // data fetch

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        // validation the data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:'All fields are required...'
            })
        }
        // cehck for pass and confirmpass are same or not?
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:'Password and Confirm-Password does not match, please try again...'
            })
        }
        //check for user existence
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists...'
            })
        }

        // fetch the most recent otp stored in db
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        // validate otp
        if(recentOtp.length === 0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:'OTP Not Found...'
            })
        } else if(otp !== recentOtp[0].otp){
            // Invalid otp
            return res.status(400).json({
                success:false,
                message:'Invalid OTP...'
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // entre the data in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return result
        return res.status(200).json({
            success:true,
            message:'User is registered successfully...',
            user
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered , Please try agaiin later...'
        })
    }
}

// login function
exports.login = async(req,res) => {
    try{
        //   get data from req body
        const {email , password} = req.body;

        // validate data
        if(!email || !password ){
            return res.status(403).json({
                success:false,
                message:'All fields are required...'
            })
        }
        // check user exists or not
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not exists, please signup first...'
            })
        }
        // generate JWT after password matching
        if(await bcrypt.compare(password ,user.password)){
            const payload = {
              email:user.email,
              id:user._id,
              accountType:user.accountType,  
            }

            const token = jwt.sign(payload , process.env.JWT_SECRET ,{
                expiresIn:'2h',
            })
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpsOnly:true,
            }
            res.cookie('token' , token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully...'
            })
        }else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect...'
            })
        }
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure , please try again...'
        })
    }
}

// change password
// hoomework
exports.changePassword = async(req,res) => {
    // fetch data from req body
    const userDetails = await User.findById(req.user.id);

    // get oldpass, newpass, confirmpass
    const {oldPassword , newPassword} =  req.body;

    // validate data
    const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
    );

    if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
            .status(401)
            .json({ success: false, message: "The old - password is incorrect" });
    }
    console.log(newPassword);

    // update pass in db
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    console.log( 'encrypted wala - ', encryptedPassword)
    const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
    );

    console.log('password updated')

    // send mail for pass updated
    try {
        const emailResponse = await mailSender(
            updatedUserDetails.email,
            'Password Updation Email',
            passwordUpdated(
                updatedUserDetails.email,
                ` ${updatedUserDetails.firstName}  ${updatedUserDetails.lastName}`
            )
        );
        console.log("Email sent successfully");
    } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending email for password updation",
            error: error.message,
        });
    }
    // return response
    return res.status(200).json({
        success: true,
        message: "Password updated successfully",
        data:updatedUserDetails ,
    });
}
