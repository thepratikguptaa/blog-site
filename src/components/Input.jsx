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
            {label && <label            className='inline-block mb-2 pl-1 text-gray-700 font-medium' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-3 rounded-lg bg-gray-50 text-gray-900 outline-none focus:bg-white duration-200 border border-gray-300 w-full shadow-sm ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input