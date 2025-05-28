import React from 'react'

const LoaderComponent = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <span className="loader"></span>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 3px solid #FFF;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
        .loader::after {
          content: '';  
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-bottom-color: #50C878;
        }
        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default LoaderComponent