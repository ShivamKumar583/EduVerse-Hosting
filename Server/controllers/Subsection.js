const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const SubSection = require('../models/SubSection');

exports.createSubsection = async(req,res) => {
    try{
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
      
      
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log('2')

      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
      console.log('3')

      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
      console.log('4')

      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    }catch(err){
        return res.status(500).json({
            success:false,
            messaage:'Subsection not created,please try again...'
        })
    }
}

exports.updateSubsection = async(req,res) => {
    try {
        const { sectionId,subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
          const video = req.files.video
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${uploadDetails.duration}`
        }
    
        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        // return res
        return res.status(200).json({
            success:true,
            data:updatedSection,
            messaage:'Subsection updated successfully...'
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            messaage:'Subsection not updated,please try again...'
        })
    }
    
}

exports.deleteSubsection = async(req,res) => {
    try {
        const { subSectionId, sectionId } = req.body

        await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
    
        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
          success: true,
          data:updatedSection,
          message: "SubSection deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
      }
}