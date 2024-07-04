import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import { set } from 'react-hook-form'
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar'
import CoureReviewModal from '../components/core/ViewCourse/CoureReviewModal'

const ViewCourse = () => {

    const [reviewModal , setReviewModal] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const {courseId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId , token)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))

            let lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=> {
                lecture += sec.subSection.length
            })

            dispatch(setTotalNoOfLectures(lecture))
        }
        setCourseSpecificDetails();
    },[])

  return (
    <>

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSideBar setReviewModal ={setReviewModal}/>
            
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className=' mx-6 mt-[10%]'>
                    <Outlet/>
                </div>
            </div>
        </div>
        {reviewModal && <CoureReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse