import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex">
        <div className="relative left-1/2"> 
            <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
            <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
        </div>
    </div>
)
}



export default LoadingSpinner