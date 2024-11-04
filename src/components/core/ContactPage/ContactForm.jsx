import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-4xl leading-10 font-semibold text-primaryDark">Got a Idea? We've got the skills. Let's team up</h1>
      <p className="text-center text-primaryDark2 mt-3">
        Tell us more about yourself and what you're got in mind.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm