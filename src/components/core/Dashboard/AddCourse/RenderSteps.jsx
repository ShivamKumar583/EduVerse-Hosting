import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course)
    const steps = [
        {
            id:1,
            title:'Course Information'
        },
        {
            id:2,
            title:'Course Builder'
        },
        {
            id:3,
            title:'Publish'
        },
    ]
    return (
        <>
            <div className="relative mb-2 flex w-full justify-center">
                {steps.map( (item) => (
                    <>
                        <div className="flex flex-col items-center "
              key={item.id}>
                            <button className={` grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id 
                            ? "bg-primaryDark4 border-primaryDark3 text-primaryLight" 
                            : "border-primaryDark2 bg-opacity-90 bg-primaryDark text-primaryLight"}  ${step > item.id && "bg-primaryLight4 text-primaryDark4"}} `}>
    
                            {
                                step > item.id ? (<FaCheck className="font-bold text-primaryDark"/>) :(item.id)
                            }
    
                            </button>
                        </div>
                       {/* Add COde for dashes between the labels */}
                       {item.id !== steps.length && (
                        <>
                            <div
                            className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                            step > item.id  ? "border-primaryLight4" : "border-primaryDark"
                            } `}
                            ></div>
                        </>
                        )}
                    </>
                ) )}
            </div>
            <div className="relative mb-16 flex w-full select-none justify-between">
                {steps.map((item) => (
                    <>
                        <div
                        className="flex min-w-[130px] flex-col items-center gap-y-2"
                        key={item.id}
                        >
                            <p
                            className={`text-sm ${
                            step >= item.id ? "text-primaryDark3" : "text-primaryDark"
                            }`}
                            >{item.title}</p>
                        </div>
                    </>
                ))}
            </div>
    
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm/>}
            {step===3 && <PublishCourse/>}
        </>
      )
}

export default RenderSteps