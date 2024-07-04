import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const [instructorData , setInstructorData] = useState([])
    const [courses , setCourses] = useState([])

    const {user} = useSelector((state)=> state.profile)
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        const getCourseDataWithStats = async() =>{
            setLoading(true)

            const instructorApiData = await getInstructorData(token)

            const result = await fetchInstructorCourses(token)
            
            console.log( '...........', instructorApiData);
            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }

            if(result){
                setCourses(result)
            } 
            setLoading(false)
        }

        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc , curr) => acc + curr.totalAmountGenerated , 0)
    const totalStudent = instructorData?.reduce((acc , curr) => acc + curr.totalStudentsEnrolled , 0)

  return (
    <div>
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} 👋</h1>
            <p className="font-medium text-richblack-200">Let's start something new</p>
        </div>

        {loading ? (<div className='spinnner'></div>) : courses.length > 0 ? (
            <div>
                        <div className="my-4 flex md:flex-row flex-col h-[600px] md:h-[450px] md:space-x-4">
                        {/* Render chart / graph */}
                        {totalAmount > 0 || totalStudent > 0 ? (
                        <InstructorChart courses={instructorData} />
                        ) : (
                        <div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Visualize</p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                            Not Enough Data To Visualize
                            </p>
                        </div>
                        )}
                        {/* Total Statistics */}
                        <div className="flex md:mt-0 mx-auto mt-6 min-w-[300px] flex-col rounded-md bg-richblack-800 p-6">
                        <p className="text-lg font-bold text-richblack-5">Statistics</p>
                        <div className="mt-4 space-y-4">
                            <div>
                            <p className="text-lg text-richblack-200">Total Courses</p>
                            <p className="text-3xl font-semibold text-richblack-50">
                                {courses.length}
                            </p>
                            </div>
                            <div>
                            <p className="text-lg text-richblack-200">Total Students</p>
                            <p className="text-3xl font-semibold text-richblack-50">
                                {totalStudent}
                            </p>
                            </div>
                            <div>
                            <p className="text-lg text-richblack-200">Total Income</p>
                            <p className="text-3xl font-semibold text-richblack-50">
                                Rs. {totalAmount}
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                <div className="rounded-md bg-richblack-800 md:mt-0 mt-[200px] p-6">
                    {/* render courses */}

                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p className="text-xs font-semibold text-yellow-50">View All</p>
                        </Link>
                    </div>

                    <div className="my-4 flex md:flex-row flex-col w-full items-start md:space-x-6 space-y-5 md:space-y-0">
                        {
                            courses.slice(0,3).map((course) => (
                                <div key={course._id} className="md:w-1/3 w-full">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-[201px] w-[100%] md:w-full rounded-md object-cover"
                                    />

                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-richblack-300">{course.studentsEnrolled.length}</p>
                                            <p className="text-xs font-medium text-richblack-300"> | </p>
                                            <p className="text-xs font-medium text-richblack-300">Rs {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        ) : (
            <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
        )}
    </div>
  )
}

export default Instructor