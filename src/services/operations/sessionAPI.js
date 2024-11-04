import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { sessionEndpoints } from "../apis";

const {GET_INSTRUCTORS_API , CREATE_SESSION_API , GET_ALL_INSTRUCTOR_SESSION_API , JOIN_MEETING_API} = sessionEndpoints;


export async function getInstructors(token){
        const toastId = toast.loading("Loading...")
        let result = []

        try{    
            const response = await apiConnector('GET' , GET_INSTRUCTORS_API,null ,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            //(response.data.data)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.data

        }catch(error){
            //("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
            toast.error("Could Not Get Enrolled Courses")

        }
        toast.dismiss(toastId)
        return result
    
}
export async function getInstructorsSession(token){
        const toastId = toast.loading("Loading...")
        let result = []

        try{    
            const response = await apiConnector('GET' , GET_ALL_INSTRUCTOR_SESSION_API,null ,
                {
                    Authorization: `Bearer ${token}`,
                } 
            )

            //(response.data.data)
 
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.data

        }catch(error){ 
            //("GET_ALL_INSTRUCTOR_SESSION_API ERROR............", error)
            toast.error("Could Not Get Session for Instructor")
        }
        toast.dismiss(toastId)
        return result
    
}

 
export async function createSession(token , InstructorId , date){
    const toastId = toast.loading("Loading...")
    let result = []
    //(token)
    try{    
        const response = await apiConnector('POST' , CREATE_SESSION_API,{InstructorId ,date},
            {
                Authorization: `Bearer ${token}`,
            }
        )

        //(response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data

    }catch(error){
        //("CREATE_SESSION_API API ERROR............", error)

        if(error.response.data.message === 'Instructor is already booked for the specified date and time.'){
            toast.error('Instructor is already booked for the specified date and time.')
            
        }
        else toast.error("Could Not Create a session")
        
        toast.dismiss(toastId)
        return result;

    }
    toast.dismiss(toastId)
    toast.success('Session Scheduled Successfully...')
    return result
}

export async function joinMeeting(token , sessionData ,meetingId){
    const toastId = toast.loading("Loading...")
    let result = []
    //(token)
    try{    
        const response = await apiConnector('POST' , JOIN_MEETING_API,{sessionData ,meetingId},
        )

        //(response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
        toast.success('Meeting Joined Successfully...')


    }catch(error){
        //("JOIN_MEETING_API API ERROR............", error)

    }
    toast.dismiss(toastId)
    return result
}






