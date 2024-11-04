import React, { useState } from 'react'
import { Table ,Tbody,Td,Th,Tr,Thead} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { MdEdit } from 'react-icons/md'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom'
import { HiClock } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa'
import { formatDate } from "../../../../services/formatDate"
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'


const CoursesTable = ({courses, setCourses}) => {
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [confirmationModal , setConfirmationModal] =  useState(null)
    const navigate = useNavigate()
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async( courseId) =>{
        setLoading(true)

        await deleteCourse({courseId:courseId} ,token);
        const result = await(fetchInstructorCourses(token))

        if(result){
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    return (
    <>
        <Table className="rounded-xl border border-primaryDark4 ">
            <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-primaryDark4 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-primaryDark">
                        Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-primaryDark">
                        Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-primaryDark">
                        Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-primaryDark">
                        Actions
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-primaryDark">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses.map((course) => (
                            <Tr key={course._id} className="flex gap-x-10 border-b border-primaryDark px-6 py-8">
                                <Td className="flex flex-1 gap-x-4">
                                    <img
                                        src={course?.thumbnail}
                                        className="h-[148px] w-[220px] rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-primaryDark4">{course.courseName}</p>
                                        <p className="text-xs text-primaryDark2">{course.courseDescription.split(" ").length >
                                        TRUNCATE_LENGTH
                                            ? course.courseDescription
                                                .split(" ")
                                                .slice(0, TRUNCATE_LENGTH)
                                                .join(" ") + "..."
                                            : course.courseDescription}</p>
                                        <p className=' text-primaryDark2'>Created:{formatDate(course.createdAt)}</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-primarLight px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                DRAFTED</p>
                                            ):(
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-primaryDark px-2 py-[2px] text-[12px] font-medium text-primaryLight">
                                                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primaryLight text-primaryDark">
                                                        <FaCheck size={8} />
                                                    </div>
                                                    PUBLISHED
                                                </p>
                                            )
                                        }
                                    </div>
                                </Td>
                                <Td className="text-sm font-medium text-primaryDark2">
                                    2hr 30min
                                </Td>
                                <Td className="text-sm font-medium text-primaryDark2">
                                    ${course.price}
                                </Td>
                                
                                <Td className="text-sm font-medium text-primaryDark2">
                                    <button disabled={loading} 
                                    onClick={()=>
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }
                                        title="Edit"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-primaryDark3"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    <button disabled={loading}
                                        onClick={()=>{
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2:
                                                "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                ? () => handleCourseDelete(course._id)
                                                : () => {},
                                                btn2Handler: !loading
                                                ? () => setConfirmationModal(null)
                                                : () => {},
                                            })
                                        }}
                                        title="Delete"
                                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>

        </Table>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default CoursesTable