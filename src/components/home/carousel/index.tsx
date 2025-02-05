'use client'

import React from 'react'
import Banner from './components/Banner'
import SideBar from './components/SideBar'
import { banners } from '@/mock_data'
import { Separator } from '@/components/ui/separator'

const Carousel = () => {
  
  return (
        <div className='flex w-full max-h-[450px] overflow-hidden mb-[125px]'>
            <SideBar/>
            <Separator orientation='vertical' className='w-[1px] h-auto'/>
            <Banner items={banners} interval={5000}/>
        </div>
  )
}

export default Carousel