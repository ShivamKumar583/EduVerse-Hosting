const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Session = require("../models/Session");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {sessionStartMail} = require('../mail/templates/sessionStartMail')
exports.createSession = async(req,res) => {
    try{

        const {InstructorId  , date} = req.body;
        const StudentId = req.user.id;
        const sessionDate = new Date(date)

        const startTime = new Date(sessionDate.getTime() - 60*60*1000)
        const endTime  = new Date(sessionDate.getTime() + 60*60*1000)



        if(!InstructorId || !StudentId || !date){
            return res.status(403).json({
                success:false,
                message:'Data missing for session creation...'
            })
        }

        // Check for existing sessions for the instructor at the same date and time
        const existingSession = await Session.findOne({ InstructorId, 
            date:{$gte:startTime,$lte:endTime} ,});

        if (existingSession) {
            return res.status(409).json({
                success: false,
                message: 'Instructor is already booked for the specified date and time.',
            });
        }
        
        const sessionDetails = await Session.create({
            InstructorId,
            StudentId,
            date
        })

        const updateInstructorData = await User.findByIdAndUpdate(InstructorId ,
            {
                availability: 'Not Available',
                $push: { sessionDetails: sessionDetails._id },
            },
        {new:true ,useFindAndModify: false})


        await updateInstructorData.save();

        const updateDetails = await User.findById(InstructorId)
            .populate('sessionDetails')
            .exec()

        return res.json({
            success: true,
            message: "Session created successfully",
            updateDetails,
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        error: ('Error in creating session.... ->',error.message),
        })
    }
}

exports.getAllInstructors = async(req,res) => {
    try{
        const getInstructors = await User.find({
            accountType:'Instructor',

        })

        if(!getInstructors){
            return res.status(403).json({
                success:false,
                message:'No available instructor found...'
            })
        }

        return res.json({
            success: true,
            data: getInstructors,
        });


    }catch(error){
        console.error('Error fetching available instructors:', error);
        return res.status(500).json({
            success: false,
            error: 'Error fetching available instructors: ' + error.message,
        });
    }
}

exports.getAllSessionsForInstructor = async(req,res) => {
    try{
        const id = req.user.id;
        const currDate = new Date();

        const getAllSessions = await Session.find({
            InstructorId:id,
            date:{$gte:currDate}
        })
        .populate('StudentId')
        .exec()

        if(!getAllSessions){
            return res.status(403).json({
                success:false,
                message:'No upcoming session...'
            })
        }

        return res.json({
            success: true,
            data: getAllSessions,
        });


    }catch(error){
        console.error('Error fetching available instructors:', error);
        return res.status(500).json({
            success: false,
            error: 'Error fetching available instructors: ' + error.message,
        });
    }
}

exports.initiateMeeting = async(req,res) => {
    try{
        const {sessionData , meetingId} = req.body;
        console.log(sessionData)
        console.log(meetingId)
        if(!sessionData || !meetingId){
            return res.status(403).json({
                success:false,
                message:'Data is missing for notifying the student...'
            })
        }

         // send mail to student
        try {
            const emailResponse = await mailSender(
                sessionData.StudentId.email,
                'Session Started Email',
                sessionStartMail(
                    sessionData.StudentId.email,
                    ` ${sessionData.StudentId.firstName}  ${sessionData.StudentId.lastName}`,
                    meetingId
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
        console.log('mail send hogya......................')
        return res.json({
            success: true,
            meetingId
        });


    }catch(error){
        console.error('Error fetching available instructors:', error);
        return res.status(500).json({
            success: false,
            error: 'Error fetching available instructors: ' + error.message,
        });
    }
}


