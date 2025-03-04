import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI"


const ChangeProfilePicture = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);
    const [imageFile , setImageFile] = useState(null);
    const [previewSource , setPreviewSource] =  useState(null);

    const fileInputRef =  useRef(null);

    const handleFileChange = (e) =>{
        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileUpload = () => {
        try{
            setLoading(true);

            const formData = new FormData()
            formData.append('displayPicture' , imageFile)
            dispatch(updateDisplayPicture(token , formData)).then(() => {
                setLoading(false)
            })

        }catch(error){
            // console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if(imageFile){
            previewFile(imageFile)
        }
    } ,[imageFile])

  return (
    <>
        <div className="flex items-center justify-between rounded-md border-[1px] border-primaryDark3 bg-primaryDark p-8 px-12 text-primaryLight">
            <div className="flex items-center gap-x-6">
                <img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover border-primaryLight border-2"
                />

                <div className="space-y-3">
                    <p className=' font- text-lg'>Change Profile Picture</p>
                    <div className="flex flex-row gap-3">

                        <input
                            type='file'
                            ref={fileInputRef}
                            className='hidden'
                            onChange={handleFileChange}
                            accept='image/png , image/gif , image/jpeg'
                            placeholder='change'
                        />
                        <button
                        onClick={handleClick}
                        disabled={loading}
                        className= 'cursor-pointer rounded-md bg-primaryDark4 py-2 px-5 font-semibold text-primaryLight'
                        >Select</button>

                        <button
                           onClick={handleFileUpload} 
                           className="flex items-center cursor-pointer gap-1 text-base font-medium text-primaryDark bg-primaryLight3 rounded-md px-3"
                        >
                            <div>Upload</div>
                            <FiUpload/>
                        </button>
                    </div>

                </div>
            </div>
        </div>


    </>
  )
}

export default ChangeProfilePicture