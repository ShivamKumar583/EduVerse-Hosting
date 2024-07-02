
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')


// reset password token
exports.resetPasswordToken = async(req,res) => {
    try{
        // fecth email data
        const email = req.body.email;

        // check for email and validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User email is not registered...'
            })
        }
        // generate token
		const token = crypto.randomBytes(20).toString("hex");

        // update user data by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate({email:email},
                        {token:token,
                        resetPasswordExpires: Date.now() + 3600000},
                        {new:true});

        // create url 
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing that url
        await mailSender(email , 'Password Reset Link', `Password Reset Link: ${url}`);
        
        // return response
        return res.status(200).json({
            success:true,
            message:'Email sent successfully , please check email and change password...'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset password mail...'
        })
    }


}


// reset password

exports.resetPassword = async(req,res) => {
    try{
        // fecth email data
        const {token , password, confirmPassword} = req.body;

        // check for password and validation
        if(password !== confirmPassword ){
            return res.json({
                success:false,
                message:'Password not matching...'
            })
        }

        //get user detils using token in db
        const userDetails = await User.findOne({token:token});

        // if no entry -invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is invalid...'
            })
        } 

        // token time not expire
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired, please regenerate password...'
            })
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // password updation in db
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        ;
        // return response
        return res.status(200).json({
            success:true,
            message:'Password reset successfull...'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reset password'
        })
    }
}