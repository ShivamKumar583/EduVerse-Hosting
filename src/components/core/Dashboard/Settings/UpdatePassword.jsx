import React, { useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {changePassword} from '../../../../services/operations/settingsAPI'
 
const UpdatePassword = () => {

  const {token} = useSelector((state) => state.auth)

  const navigate = useNavigate();
  const dispatch =  useDispatch();

  const [showOldPassword , setShowOldPassword] = useState(false);
  const [showNewPassword , setShowNewPassword] = useState(false);

  const {
    register, handleSubmit , formState: {errors},
  } = useForm();

  const submitPasswordForm = async(data) => {
    try{
      // console.log(data);
      await changePassword(token , data)

    }catch(error){
      // console.log("ERROR MESSAGE IN PASSWORD UPDATION- ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div  className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-primaryDark3 bg-primaryDark p-8 px-12">
          <h2 className="text-lg font-semibold text-primaryLight">Password</h2>

          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="relative flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="oldPassword" className="lable-style text-primaryLight2">
                Current Password
              </label>

              <input
              type={showOldPassword ? 'text' : 'password'}
                id='oldPassword'
                name='oldPassword'
                placeholder='Enter Current Password'
                className='form-style'
                {...register('oldPassword' , {required:true})}
              />

              {/* showpassword icon */}
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#d1c6be " />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#d1c6be " />
                )}
              </span>
              {
                errors.oldPassword && (
                  <span className="-mt-1 text-[12px] text-primaryLight4">Please enter your Current Password</span>
                )
              }

            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="newPassword" className="lable-style text-primaryLight2">
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
              />

              {/* showpassword icon */}
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#d1c6be " />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#d1c6be " />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-primaryLight4">
                  Please enter your New Password.
                </span>
              )}
            </div>

          </div>

        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-primaryDark4 py-2 px-5 font-semibold text-primaryLight3"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
        
    </>
  )
}

export default UpdatePassword