

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createSession, getInstructors } from '../../../../services/operations/sessionAPI'
import IconBtn from '../../../common/IconBtn'
import ScheduleSessionModal from './scheduleSessionModal'
import toast from 'react-hot-toast'

const ScheduleSession = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [mentors, setMentors] = useState([]);
    const [sessionModal , setSessionModal] = useState(false);
    const [currMentor , setCurrMentor] = useState(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try{ 
                const response = await getInstructors(token);
                console.log(response);
                setMentors(response);
            }catch(error){
                console.log("Could not fetch available instructor")
            }
        };
        fetchInstructors();
    }, []);

    const confirmSession = async(selectedDate) => {
        const response = await createSession(token ,currMentor ,selectedDate);

        if(response.success){
          console.log('Session Created Successfully')
        }else{
          console.log('Error checking availability:', response);
        }
    }

    const setData = async(mentorData) => {
        setSessionModal(true)
        setCurrMentor(mentorData)
    }

  return (
    <>
        <div className="text-3xl text-richblack-50 ml-12 md:ml-0">Schedule A Session</div>
        {!mentors ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
            </div>
        ) : !mentors.length ? (
            <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                Instructors are not available.
            {/* TODO: Modify this Empty State */}
            </p>
        ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-1/3 px-5 py-3">Instructor Name</p>
            <p className="w-1/3 px-2 py-3">Expertise</p>
            <p className="w-1/3 flex-1 px-2 py-3">Book a session</p>
          </div>
          {/* mentors Names */}
          {mentors.map((mentor, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] flex-col md:flex-row cursor-pointer items-center gap-4 px-5 py-3"
              >
                <img
                  src={mentor.image}
                  alt="mentor_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{mentor.firstName} {mentor.lastName}</p>
                  <p className="text-xs text-richblack-300">No. of Courses : {" "}
                    {mentor?.courses.length || 0 }
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{mentor?.expertise.length > 3 ? 
                mentor?.expertise?.splice(0,3).map((field,index) => (
                    <p key={index}>{field}</p>
                ))
             : mentor?.expertise.map((field, index) => (
                    <p key={index}>{field}</p>
                ))
              }</div>
              <div className="flex flex-col gap-2 px-2 py-3">
                <button
                    className=' bg-yellow-50 m-3 w-fit text-black font-semibold rounded-md cursor-pointer'
                    onClick={() => (setData(mentor))}
                >
                  <span>Schedule a session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {sessionModal && <ScheduleSessionModal setSessionModal={setSessionModal} mentorData={currMentor} confirmSession={confirmSession} />}
    </>
  )
}

export default ScheduleSession