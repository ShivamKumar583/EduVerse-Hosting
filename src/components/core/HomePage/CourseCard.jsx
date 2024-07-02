import React from 'react'
import { MdPeople } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";

const CourseCard = ({cardData , currentCard , setCurrentCard}) => {
  return (
    <div className={`w-[360px] lg:w-[30%] h-[300px] ${currentCard === cardData.heading ? ' bg-white shadow-[12px_12px_0_0] shadow-yellow-50' : 'bg-richblack-800 hover:bg-white'}
     text-richblack-25 box-border cursor-pointer group transition-all duration-200`}
     onClick={() => setCurrentCard(cardData.heading)}>
     
        <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'
        >
            <h2 className={`${currentCard === cardData.heading ? ' text-richblack-800' : ' text-white group-hover:text-richblack-800'} font-semibold text-[20px] transition-all duration-200`}>{cardData.heading}</h2>

            <p className=' text-richblack-400'>{cardData.description}</p>

            <div className={`flex justify-between ${currentCard === cardData.heading ? ' text-blue-300 ' : ' text-richblack-300 group-hover:text-blue-300'} px-6 py-3 mt-[25%] transition-all duration-200`}>

                <div className=' flex items-center gap-2 text-[16px]'>
                    <MdPeople/>
                    <p>{cardData.level}</p>

                </div>

                <div className=' flex items-center gap-2 text-[16px]'>
                    <LuNetwork/>
                    <p>{cardData.lessionNumber} Lession</p>

                </div>

            </div>


            
        </div>
    </div>
  )
}

export default CourseCard