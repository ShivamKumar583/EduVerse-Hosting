import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-bold text-richblue-200 bg-gradient-to-b from-[#38f2ff] from-10% via-blue-100 via-30% to-[#1fffd2] to-90% text-transparent bg-clip-text'>
    {" "}
        {text}
    </span>
  )
}

export default HighlightText