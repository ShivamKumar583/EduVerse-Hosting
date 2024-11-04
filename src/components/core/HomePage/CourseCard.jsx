import React from 'react'
import { MdPeople } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";

const CourseCard = ({cardData , currentCard , setCurrentCard}) => {
  return (
    <div className={`w-[360px] lg:w-[30%] h-[300px] ${currentCard === cardData.heading ? ' bg-primaryLight2 shadow-[12px_12px_0_0] shadow-primaryLight3' : 'bg-primaryDark hover:bg-primaryLight2'}
     text-richblack-25 box-border cursor-pointer group transition-all duration-200`}
     onClick={() => setCurrentCard(cardData.heading)}>
     
        <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'
        >
            <h2 className={`${currentCard === cardData.heading ? ' text-primaryDark' : ' text-primaryLight2 group-hover:text-primaryDark'} font-semibold text-[20px] transition-all duration-200`}>{cardData.heading}</h2>

            <p className=' text-primaryDark3'>{cardData.description}</p>

            <div className={`flex justify-between ${currentCard === cardData.heading ? ' text-primaryDark ' : ' text-primaryLight2 group-hover:text-primaryDark'} px-6 py-3 mt-[25%] transition-all duration-200`}>

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