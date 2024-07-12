import {devConfig} from '../utils/devConfig'
import { getToken } from './operations/sessionAPI'

let meetingArgs ={...devConfig}

if(!meetingArgs.signature && meetingArgs.topic){

    const requestOptions = {
        method:"POST",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(meetingArgs)
    }
    getToken(requestOptions).then(res => meetingArgs.signature = res) 
}