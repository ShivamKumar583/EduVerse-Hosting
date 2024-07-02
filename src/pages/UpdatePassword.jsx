import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UpdatePassword = () => {
    const [showPassword , setShowPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const {password, confirmPassword} = formData;
    const navigate = useNavigate();


    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

    
    const handleOnSubmit = (e) => {
        e.preventDefault()
    
        if (password !== confirmPassword) {
          toast.error("Passwords Do Not Match")
          return
        }
        const token = location.pathname.split('/').at(-1);

        dispatch(resetPassword(password, confirmPassword , token ,navigate))
      }

  return (
    <div className=' w-11/12'>
        {
            loading ? (
                <div>
                    {/* //Loading wala h ye bhi no need */}
                </div>
                ) : (
                <div className=' text-white flex flex-col gap-y-3 justify-center items-center mt-[10%] ml-[16%]'>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new password and you are all set.</p>
                    <form onSubmit={handleOnSubmit}>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter New Password"
                            style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        </label>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                            >
                            Reset Password
                        </button>

                        <div className=' text-white'>
                            <Link to='/login'>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </form>
                </div>
                )
        }
    </div>
  )
}

export default UpdatePassword