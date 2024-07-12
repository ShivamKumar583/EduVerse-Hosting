import React from 'react'
import { useSelector } from 'react-redux'
import { joinMeeting } from '../services/operations/sessionAPI';

const MeetingFlag = async({isMeetingStarted , meetingId}) => {
    const {sessionData} = useSelector((state) => state.meeting)
    const {token} = useSelector((state) => state.auth)

  if(isMeetingStarted){
    try{
        const response = await joinMeeting(token,sessionData,meetingId);

        return response;
    }catch(err){    
        console.log(err)
    }
  }
}

export default MeetingFlag