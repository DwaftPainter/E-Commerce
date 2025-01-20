'use client'

import Layout from '@/layouts/layout'
import React from 'react'
import Banner from './components/Banner'
import SideBar from './components/SideBar'
import { Separator } from '../ui/separator'

const Carousel = () => {
  const banners = ["assets/images/banner.jpg", "assets/images/banner1.jpg", "assets/images/banner2.jpg", "assets/images/banner3.jpg"];

  return (
    <Layout>
        <div className='flex w-full max-h-[450px] overflow-hidden mb-[125px]'>
            <SideBar/>
            <Separator orientation='vertical' className='w-[1px] h-auto'/>
            <Banner items={banners} interval={5000}/>
        </div>
    </Layout>
  )
}

export default Carousel