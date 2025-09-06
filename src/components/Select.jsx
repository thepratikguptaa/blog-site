import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-2 pl-1 text-gray-800 font-semibold'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-gray-50 text-gray-900 outline-none focus:bg-white focus:border-teal-500 border-2 border-gray-300 w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-teal-500/50 cursor-pointer ${className}`}>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)