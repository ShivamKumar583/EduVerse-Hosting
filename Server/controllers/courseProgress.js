const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");



exports.updateCourseProgress = async(req,res) => {
    const {courseId , subSectionId} = req.body;
    const userId = req.user.id;

    try{
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({ error: "Invalid subsection" })
        }


        // check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        })


        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            courseProgress.completeVideos.push(subSectionId);
            await courseProgress.save();

          } else{
            if(courseProgress.completeVideos.includes(subSectionId)){
                return res.status(400).json({ error: "Subsection already completed" })
            }
          }

          return res.status(200).json({ message: "Course progress updated" })
    }catch(error){
        console.error(error)
    return res.status(500).json({ error: "Internal server error" })
    }
}