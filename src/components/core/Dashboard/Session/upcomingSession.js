import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorsSession } from '../../../../services/operations/sessionAPI'
import IconBtn from '../../../common/IconBtn'
import { formattedDate } from '../../../../utils/dateFormatter'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSessionData } from '../../../../slices/meetingSlice'

const UpcomingSession = () => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const {sessionData} = useSelector((state) => state.meeting)
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllSessions = async() => {
            try{
                const response = await getInstructorsSession(token)
                // console.log(response) 
                setSessions(response); 
            }catch(error){
                // console.log("Could not found any session")
            }
        } 
        getAllSessions();
    },[])

    useEffect(() => {
      const startMeeting = async() => {
        try{   
            if(sessionData){
              // console.log(sessionData)
              navigate('/dashboard/start-session')
            }

        }catch(error){
            // console.log('Error while starting meeting...' , error)
        }
    }
    startMeeting()
  },[sessionData])

    

    
  return ( 
    <>
        <div className="text-3xl text-primaryDark ml-12 md:ml-0">Upcoming Session</div>
        {!sessions ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
            </div>
        ) : !sessions.length ? (
            <p className="grid h-[10vh] w-full place-content-center text-primaryDark2">
                Instructors are not available.
            {/* TODO: Modify this Empty State */}
            </p>
        ) : (
        <div className="my-8 text-primaryLight">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-primaryDark4">
            <p className="w-1/3 px-5 py-3">Student Name</p>
            <p className="w-1/3 px-2 py-3 pl-0">Date of session</p>
          </div>
          {/* sessions Names */}
          {sessions.map((session, i, arr) => (
            <div
              className={`flex gap-x-10 md:gap-x-0 md:justify-between items-center border border-primaryDark4 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[48%] cursor-pointer items-center gap-4 px-5 py-3 gap-x-2 justify-between"
              >
              <div className=' flex ju flex-col md:flex-row items-center gap-x-3'>
              <img
                  src={session.StudentId.image}
                  alt="session_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2 text-primaryDark">
                  <p className="font-semibold">{session.StudentId.firstName} {session.StudentId.lastName}</p>
                </div>

              </div>
                
                <div className="w-1/3 pl-[15px] text-primaryDark">{formattedDate(session.date)}</div>
              </div>
              
              <div className="flex w-2/5 md:w-[170px] flex-col gap-2 px-2 py-3">
                <IconBtn
                    text='Start Session' className={'px-3 mr-4'}
                    onclick={() => dispatch(setSessionData(session))}
                />
              </div>
            </div>
          ))}
        </div>
      )}
   
    </>
  )
}

export default UpcomingSession