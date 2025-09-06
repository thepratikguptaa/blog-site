import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label            className='inline-block mb-2 pl-1 text-gray-800 font-semibold' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-3 rounded-lg bg-gray-50 text-gray-900 outline-none focus:bg-white focus:border-teal-500 border-2 border-gray-300 w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-teal-500/50 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input