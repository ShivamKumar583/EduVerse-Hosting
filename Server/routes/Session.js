const express = require("express")
const router = express.Router()
const { auth, isStudent } = require("../middleware/auth")

const {
    createSession,
    getAllInstructors,
    getAllSessionsForInstructor,
    initiateMeeting
} = require('../controllers/Session')



router.post('/createSession' ,auth , createSession);
router.get('/getInstructors' ,auth ,isStudent, getAllInstructors);
router.get('/upcoming-session' , auth ,getAllSessionsForInstructor)
router.post('/join-meeting' ,initiateMeeting );



module.exports = router