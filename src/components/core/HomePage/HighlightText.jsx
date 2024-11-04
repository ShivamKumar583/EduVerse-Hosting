import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-bold text-primaryDark'>
    {"  "}
        {text}
    {"  "}
    </span>
  )
}

export default HighlightText