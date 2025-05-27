import React from 'react'

// Button component for reuse
function Button({
    children,    type = 'button',    bgColor = 'bg-teal-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${bgColor} ${textColor} ${className}`}type={type} {...props}>
        {children}
    </button>
  )
}

export default Button