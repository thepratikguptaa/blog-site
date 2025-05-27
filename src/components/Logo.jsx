import React from 'react'

function Logo({width = '40px'}) {
  return (
    <img 
      src="https://img.freepik.com/premium-vector/modern-initial-letter-p-floral-logo_327835-5666.jpg?semt=ais_hybrid&w=740"
      alt="Blog Logo"
      style={{ width, height: 'auto', objectFit: 'contain' }}
    />
  )
}

export default Logo