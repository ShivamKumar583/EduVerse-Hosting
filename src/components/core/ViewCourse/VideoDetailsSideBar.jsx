import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const VideoDetailsSideBar = ({setReviewModal}) => {
    const [activeStatus , setActiveStatus] = useState("")
    const [videobarActive , setvideobarActive] = useState("")
    const navigate = useNavigate()
    const {sectionId , subSectionId} = useParams()
    const location = useLocation()
    const [open,setOpen] = useState(false);

    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length)
                return;
            
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)

            // set currrent video here
            setvideobarActive(activeSubSectionId)

        })()
    },[courseSectionData  , courseEntireData , location.pathname])

  return (
    <>
      <div>
        {open ? (
          <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-primaryDark3 bg-primaryDark4">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-primaryDark3 py-5 text-lg font-bold text-primaryLight">
          
          
          <div className="flex w-full gap-x-5">

            <div onClick={() => setOpen(!open)} className="flex h-[35px] my-2 mx-2 w-[35px] items-center justify-center rounded-full bg-primaryLight3 p-1 text-primaryDark4 hover:scale-90">
              <IoIosArrowForward size={30} />
            </div>

            <button
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex p-3 w-fit items-center justify-center rounded-xl bg-primaryLight3   text-primaryDark4 hover:scale-90 text-sm"
              title="back"
            >
              Back
            </button>

            <IconBtn
              text="Add Review"
              className="ml-auto rounded-xl hover:scale-90"
              onclick={() => setReviewModal(true)}
            />
      
          </div>

          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-primaryLight3">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-primaryLight3"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-primaryDark px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videobarActive === topic._id
                          ? "bg-primaryDark2 font-semibold text-primaryLight3"
                          : "hover:bg-primaryDark"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setvideobarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
        ) : (
          <div onClick={() => setOpen(!open)} className="flex h-[35px] my-2 mx-2 w-[35px] items-center justify-center rounded-full bg-primaryDark p-1 text-primaryLight hover:scale-90">
            <IoIosArrowForward size={30} />
          </div>
        )}
      </div>
      
    </>
  )
}

export default VideoDetailsSideBar