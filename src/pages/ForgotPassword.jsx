import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeftLong } from 'react-icons/fa6';


const ForgotPassword = () => {
    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent));
    }

  return (
    <div className=' w-11/12'>
        {
         loading ? (
            /* loading wala div h but humne authApi me iska alternate dal dia to yaha need nhi h */

            <div></div>
         ) : (
            <div className=' text-white flex flex-col gap-y-3 justify-center items-center mt-[10%] ml-[16%]'>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 -ml-16">
                    {
                        !emailSent ? "Reset your password" : "Check Your Email"
                    }
                </h1>

                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 mb-2 -ml-9 w-[500px]">
                    {
                        !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery." 
                        :
                         `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='flex gap-y-3 flex-col tex2xl -ml-11 w-[500px]'>
                    {
                        !emailSent && (
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>

                                <input required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Your Email Address'

                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                        )
                    }
                    <button type='submit' className='w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                        {
                            !emailSent ? "Reset Passsword" : "Resend Email"
                        }
                    </button>
                </form>

                <div>
                <Link to='/login' className='flex gap-x-2 items-center -ml-11'>
                        <FaArrowLeftLong/>
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
         )    
        }
    </div>
  )
}

export default ForgotPassword