import React, { useState } from 'react'
import LoaderComponent from './LoaderComponent'

// Button component for reuse
function Button({
    children, 
    type = 'button',
    bgColor = 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (props.onClick) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      await props.onClick(e);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoaderComponent />}
      <button 
        className={`w-full transform hover:scale-[1.02] transition-all duration-300 py-3 text-lg font-semibold rounded-lg shadow-md cursor-pointer hover:shadow-lg ${bgColor} ${textColor} ${className}`}
        type={type} 
        {...props}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button