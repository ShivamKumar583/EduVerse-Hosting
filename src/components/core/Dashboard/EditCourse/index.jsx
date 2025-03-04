import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state) => state.course)
    const [loading , setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true)

            const result = await getFullDetailsOfCourse(courseId , token)
            if(result.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails();
    },[])

    if(loading){
        return(
            <div>
                Return...
            </div>
        )
    }

  return (
    <div >
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 ml-[15%] ">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
            {
                course ? (<RenderSteps/>) : (<p  className="mt-14 text-center text-3xl font-semibold text-primaryDark">Course Not Found</p>)
            }
        </div>

    </div>
  )
}

export default EditCourse