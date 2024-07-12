
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconBtn from '../../../common/IconBtn';

const ScheduleSessionModal = ({setSessionModal , mentorData,confirmSession }) => {
    const [selectedDate , setSelectedDate] = useState(new Date())
    const handleSubmit = () => {
        confirmSession(selectedDate)
        setSessionModal(false)
    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Selec Date and Time</p>
          <button onClick={() => setSessionModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6 text-richblack-5 ">
        <h3 className='font-semibold text-lg -mt-3 mb-3'>Instructor :-</h3>
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={mentorData?.image}
              alt={mentorData?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {mentorData?.firstName} {mentorData?.lastName}
              </p>
            </div>
          </div>
          <div
            className="mt-6 flex flex-col items-center"
          >
            
            <div className="flex w-11/12 flex-col space-y-2 ml-16 md:-mr-10">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Select Date and Time <sup className="text-pink-200">*</sup>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp" className=' bg-richblack-700 text-richblack-100 rounded-md text-center'
              />
              
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2 -ml-10">
              <button
                onClick={() => setSessionModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <IconBtn text="Confirm Session"  onclick={() => handleSubmit()}/>
            </div>
          </div>
        </div>
      </div>
      {}
    </div>
  )
}

export default ScheduleSessionModal