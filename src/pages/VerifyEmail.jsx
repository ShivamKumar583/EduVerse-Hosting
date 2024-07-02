import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {sendOtp, signUp} from '../services/operations/authAPI'
import { Link } from 'react-router-dom';
import CTAButton from '../components/core/HomePage/Button'
import { BiLeftArrow, BiLeftArrowAlt } from 'react-icons/bi';
import { FaArrowLeftLong, FaClockRotateLeft } from 'react-icons/fa6';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const {loading , signupData} = useSelector((state) => state.auth);
    const [otp , setOtp] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        if(!signupData){
            navigate('/signup');
        }
    })

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;


        dispatch(signUp(accountType , firstName , lastName , email , password, confirmPassword , otp,navigate));

      }


  return (
    <div className=' w-11/12 '>
    {
        loading ? 
        (<div>
            {/* loading wala div */}
        </div>) : (
            
        <div  className=' text-white flex flex-col gap-y-3 justify-center items-center mt-[10%] ml-[16%]'>

            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 -ml-11">Verify Email</h1>

            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 mb-2 w-[40%]">A verification code has been sent to you. Enter the code below.</p>

            <form onSubmit={handleOnSubmit} className='flex gap-y-3 flex-col tex2xl -ml-11'>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className=' text-richblack-900 text-4xl'>- </span>}
                    placeholder='-'
                    renderInput={(props) => <input {...props} className=' bg-richblack-800 rounded-md mb-2 text-richblack-100 aspect-square text-5xl'
                    />}
                />
                <button type='submit' className='w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900' >
                    Verify Email
                </button>
            </form>

            <div className='mt-4 flex items-center justify-between gap-x-28 '>
                <div className='text-richblack-5'>
                    <Link to='/login' className='flex gap-x-2 items-center -ml-11'>
                        <FaArrowLeftLong />
                        <p>Back to Login</p>
                    </Link>
                </div>

                <button onClick={() => dispatch(sendOtp(signupData.email , navigate))} className=' flex items-center gap-x-2 text-blue-300 ml-3'>
                    <FaClockRotateLeft/>
                    Resend it
                </button>
            </div>

            

        </div>

        )
    }
    </div>
  )
}

export default VerifyEmail