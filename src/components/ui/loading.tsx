import React from 'react'

const Loading = () => {
    return (
        <div className='flex flex-col gap-4 items-center'>
            <div className='rounded-full animate-spin h-12 w-12 border-gray-300 border-4 border-t-secondary2'></div>
            <p className='font-semibold text-gray-500'>Loading...</p>
        </div>
    )
}

export default Loading
