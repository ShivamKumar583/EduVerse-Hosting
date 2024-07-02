const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');


// create rating
exports.createRating = async(req,res) => {
    try{
        // get user id
        const userId = req.user.id;
        
        // fetch data of review
        const {rating , review, courseId} = req.body;
    

        // check if user is enroolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch: {$eq:userId}},
            }
        )

        // validatiob
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                messaage:'Student is not enrolled in the course.'
            })
        }

        // check if user already reviewd or not
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user.'
            })
        }

        // create rating
        const ratingReview = await RatingAndReview.create({
            rating , review, course:courseId,user:userId
        })

        // update the course with new rating
        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReview:ratingReview._id,
                }
            },
            {new:true},
        )

        // return response
        return res.status(200).json({
            success:true,
            message:'Rating and review created successfully.'
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            messaage:err.messaage,
        })
    }
}



// get average rating
exports.getAverageRating = async(req,res) => {
    // get courseid
    const courseId = req.body.courseId;

    // calculate avg rating
    const result = await RatingAndReview.aggregate([
        {
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating: {$avg: '$rating'},

            }
        }
    ]) 
    // return rating
    if(result.length > 0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating,
        })
    }

    // if no ratings
    return res.status(200).json({
        success:true,
        messaage:'Average rating is 0,no ratings given till now',
        averageRating:0,
    })
}



// get all rating
exports.getAllRating = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:'user',
            select:"firstName lastName email image",
        })
        .populate({
            path:'course',
            select: "courseName",
        })
        .exec();

        return res.status(200).json({
            success:true,
            messaage:'All reviews fetched successfully',
            data:allReviews,

        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            messaage:err.messaage
        })
    }
}
