const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    InstructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date:{
        type:Date,
    },
    feedback:{
        type:String,
    },
   
}, {timestamps: true }
)

module.exports = mongoose.model("Session", sessionSchema);