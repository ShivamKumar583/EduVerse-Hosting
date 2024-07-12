import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseSlice from "../slices/viewCourseSlice";
import meetingSlice from "../slices/meetingSlice";

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseSlice,
    meeting:meetingSlice
})

export default rootReducer