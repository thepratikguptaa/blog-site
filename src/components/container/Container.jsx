import React from 'react'

// Container component to center content and set max width
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container