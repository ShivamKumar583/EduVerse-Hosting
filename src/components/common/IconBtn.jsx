import React from 'react'

const IconBtn = ({
    text , onclick, children , disabled, outline=false , className,type
}) => {
  return (
    <button onClick={onclick} disabled = {disabled} type={type} className={`flex items-center ${
        outline ? "border border-primaryLight3 bg-transparent" : "bg-primaryLight3"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-primaryDark4 ${className}`}>
    {
        children ? (
            <>
                <span className={`${outline && "text-primaryLight4"}`}>
                    {text}
                </span>
                {children}
            </>
        ) : (text) 
    }
    </button>
  ) 
}

export default IconBtn