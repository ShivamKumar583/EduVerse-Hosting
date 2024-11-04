import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { IoChatbubble } from 'react-icons/io5'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className=' mt-14 text-primaryDark'>

        <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-primaryDark lg:flex-row'>
            {/* left box */}
            <div className=' lg:w-[40%]'>
                <div className='flex flex-col gap-6 rounded-xl bg-primaryDark p-4 lg:p-6'>

                    <div className='flex flex-col gap-[2px] p-3 text-sm text-primaryLight'>
                        <div className='flex flex-row items-center gap-3'>
                            <IoChatbubble/>
                            <h1 className='text-lg font-semibold text-primaryLight4'>Chat on us</h1>
                        </div>

                        <p className='font-medium'>
                            Our friendly team is here to help.
                        </p>
                        <p className=' font-semibold'>info@eduverse.com</p>

                    </div>


                    <div className='flex flex-col gap-[2px] p-3 text-sm text-primaryLight'>
                        <div className='flex flex-row items-center gap-3'>
                            <FaEarthAsia/>
                            <h1 className='text-lg font-semibold text-primaryLight4'>Visit us</h1>
                        </div>

                        <p className=' font-medium'>
                            Come and say hello at our office HQ.
                        </p>
                        <p className=' font-semibold'>
                            Akshya Nagar 1st Block 1st Cross, 
                            Rammurthy nagar, Bangalore-560016
                        </p>

                    </div>

                    <div className='flex flex-col gap-[2px] p-3 text-sm text-primaryLight'>
                        <div className='flex flex-row items-center gap-3'>
                            <FaPhoneAlt/>
                            <h1 className='text-lg font-semibold text-primaryLight4'>Call us</h1>
                        </div>

                        <p className=' font-medium'>
                            Mon - Fri From 8am to 5pm
                        </p>
                        <p className=' font-semibold'>
                            +123 456 7869
                        </p>

                    </div>

                    
                </div>

            </div>

            {/* right box */}
            <div className='lg:w-[60%]'>
            <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                <ContactForm/>
            </div>
            </div>
        </section>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-8 bg-primaryDark2 text-primaryLight2">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
        <Footer/>

    </div>
  )
}

export default ContactUs