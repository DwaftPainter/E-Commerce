import Image from 'next/image';
import React from 'react'

interface bannerProps {
    items?: React.ReactNode[];
    interval?: Number    
}

const Banner = ({ items, interval } : bannerProps) => {
  return (
    <div className='pl-[44px] pt-[44px] w-full h-full'>
        <img src={"assets/images/banner.png"} className='w-max-[344px] h-full' alt=''/>
    </div>
  )
}

export default Banner