import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';

import CountryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading , setLoading] = useState(false);

    const {
        register ,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        // console.log(data)
        try{
            setLoading(true)
            // const response = await apiConnector('POST' , contactusEndpoint.CONTACT_US_API , data);

            const response = {status :'ok'}
            // console.log(response);
            setLoading(false);

        }catch(err){
            // console.log('Error in submitting Contactus Form' , err.message);
            setLoading(false);
        }

    }


    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}
    className=' flex flex-col gap-7'>
        <div className='flex flex-col justify-between lg:flex-row'>
            {/* first Name */}
            <div className=' w-[48%]'>
                <label htmlFor='firstName'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-primaryDark">
                    First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    type="text"
                    name="firstName"
                    id='firstName'
                    placeholder="Enter first name"
                    {...register('firstName' , {required:true})}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-primaryDark p-[12px] text-primaryLight "
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please enter your name
                            </span>
                        )
                    }
                </label>
            </div>

            {/* last name */}
            <div className='w-[48%]'>
                <label htmlFor='lastName'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-primaryDark">
                    Last Name 
                    </p>
                    <input
                    type="text"
                    name="lastName"
                    id='lastName'
                    placeholder="Enter last name"
                    {...register('lastName' )} 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-primaryDark p-[12px] text-primaryLight"
                    />
                    {
                        errors.lastName && (
                            <span>
                                Please enter your name
                            </span>
                        )
                    }
                </label>
            </div>

        </div>

        {/* email */}
        <div>
                <label htmlFor='email'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-primaryDark">
                    Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    type="email"
                    name="email"
                    id='email'
                    placeholder="Enter your email"
                    {...register('email',{required:true} )} 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-primaryDark p-[12px] text-primaryLight"
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your email address
                            </span>
                        )
                    }
                </label>
            </div>
            
        {/* phone no. */}
        <div className=' flex flex-col gap-2'>
            <label htmlFor='phonenumber'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-primaryDark">
                Phone No. <sup className="text-pink-200">*</sup>
                </p>

                <div className=' flex flex-row gap-8'>
                    {/* dropdown */}
                    <div className='flex flex-col gap-2 w-[81px]'>
                        <select name='dropdown' id='dropdown'  className=' bg-primaryDark text-primaryLight p-3 rounded-md'
                        {...register('countrycode', {required:true})} 
                        style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}>
                            {
                                CountryCode.map((element , index) =>{
                                    return(
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <input
                type="number"
                id='phonenumber'
                name='phonenumber'
                placeholder="123456789"
                {...register('phoneNo',
                {
                    required:true,
                    maxLength:{value:10 , message:'Invalid phone number'},
                    minLength:{value:8 , message:'Invalid phone number'}
                } )} 
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full
                 rounded-[0.5rem] bg-primaryDark p-[12px] text-primaryLight"
                />

                </div>

                
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </label>
                      
        </div>

        {/* message box */}
        <div>
            <label htmlFor='message'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-primaryDark">
                Message <sup className="text-pink-200">*</sup>
                </p>
                <textarea
                name="message"
                id='message'
                cols={30}
                rows={7}
                placeholder="Enter your message"
                {...register('message',{required:true} )} 
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-primaryDark p-[12px] text-primaryLight"
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message
                        </span>
                    )
                }
            </label>
        </div>


        <button type='submit ' className='rounded-md bg-primaryLight4 px-6 py-3 text-center text-[13px] font-bold text-primaryDark shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]  transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-primaryDark3 sm:text-[16px] '>
                    Send Message
        </button>

    </form>
  )
}

export default ContactUsForm