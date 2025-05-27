import React from 'react'

// Button component for reuse
function Button({
    children, type = 'button',bgColor = 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`w-full  transform hover:scale-[1.02] transition-all duration-300 py-3 text-lg font-semibold text-white rounded-lg shadow-md ${bgColor} ${textColor} ${className}`}type={type} {...props}>
        {children}
    </button>
  )
}

export default Button