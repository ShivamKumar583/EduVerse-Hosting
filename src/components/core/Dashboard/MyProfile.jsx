import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn'
import { MdEditDocument } from 'react-icons/md';
import { formattedDate } from "../../../utils/dateFormatter"

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    
  return (
    <>
      <h1 className="mb-14 ml-16 md:ml-10 text-3xl font-medium text-primaryDark">
        My Profile
      </h1>
      <div className="flex md:flex-row flex-col items-center justify-between rounded-md border-[1px] border-primaryDark3 bg-primaryDark p-8 px-12 gap-y-4">
        <div className="flex md:flex-row flex-col items-center gap-x-4 ">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square mx-auto md:m-0 w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1 mt-3 md:mt-0 text-center md:text-left">
            <p className="text-lg font-semibold text-primaryLight">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-primaryLight2">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <MdEditDocument />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-primaryDark3 bg-primaryDark p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-primaryLight">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <MdEditDocument />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-primaryLight"
              : "text-text-primaryLight2"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-primaryDark3 bg-primaryDark p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-primaryLight">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <MdEditDocument />
          </IconBtn>
        </div>
        <div className="flex md:flex-row flex-col gap-y-5 md:gap-y-0 max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-primaryLight2">First Name</p>
              <p className="text-sm font-medium text-primaryLight">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-primaryLight2">Email</p>
              <p className="text-sm font-medium text-primaryLight">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-primaryLight2">Gender</p>
              <p className="text-sm font-medium text-primaryLight">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-primaryLight2">Last Name</p>
              <p className="text-sm font-medium text-primaryLight">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-primaryLight2">Phone Number</p>
              <p className="text-sm font-medium text-primaryLight">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-primaryLight2">Date Of Birth</p>
              <p className="text-sm font-medium text-primaryLight">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile