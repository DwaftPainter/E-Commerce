'use client'

import React from 'react'
import Banner from './components/Banner'
import SideBar from './components/SideBar'
import { banners } from '@/mock_data'

const Carousel = () => {
  
  return (
        <div className='flex w-full max-h-[450px] overflow-hidden lg:mb-[125px] sm:mb-16  mb-10'>
            <SideBar/>
            <Banner items={banners} interval={5000} className='lg:w-[90%]'/>
        </div>
  )
}

export default Carousel