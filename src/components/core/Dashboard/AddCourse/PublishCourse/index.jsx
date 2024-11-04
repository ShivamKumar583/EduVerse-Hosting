import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

const PublishCourse = () => {

    const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    } = useForm()

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(course.status === COURSE_STATUS.PUBLISHED){
            setValue('public' , true)
        }
    },[])

    const handleCoursePublish = async() => {
        if(course.status === COURSE_STATUS.PUBLISHED && getValues('public') === true || (course.status === COURSE_STATUS.DRAFT && getValues('publuc') === false)){
            // no update in form , no need of api call
            goToCourse()
            return;
        }

        const formData = new FormData()
        formData.append('courseId' , course._id)
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append('status' , courseStatus)

        setLoading(true)
        const result = await editCourseDetails(formData , token)

        if(result){
            goToCourse()
        }

        setLoading(false)
    }

    const goToCourse = () =>{
        dispatch(resetCourseState())
        // navigate
    }

    const onSubmit = () => {
        handleCoursePublish()
    } 
    const goBack = () => {
        dispatch(setStep(2))
    } 

  return (
    <div className="rounded-md border-[1px] border-primaryDaark3 bg-primaryDark p-6">
        <p className="text-2xl font-semibold text-primaryLight3">Publish Course</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div  className="my-6 mb-8">
                <label htmlFor='public' className="inline-flex items-center text-lg">
                <input
                    type='checkbox'
                    id='public'
                    {...register('public')}
                    className="border-gray-300 h-4 w-4 rounded bg-primaryLight text-primaryLight focus:ring-2 focus:ring-primaryLight"
                />

                    <span className="ml-2 text-primaryLight">Make this Course Public.</span>

                </label>
            </div>

            <div className="ml-auto flex max-w-max items-center gap-x-4">
                <button disabled={loading}
                    type='button'
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-primaryDark4 py-[8px] px-[20px] font-semibold text-primaryLight"
                >
                    Back
                </button>
                <IconBtn disabled={loading} text='Save Changes'/>
            </div>

        </form>
    </div>
  )
}

export default PublishCourse