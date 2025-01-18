import Layout from '@/layouts/layout'
import React from 'react'
import Banner from './components/Banner'
import SideBar from './components/SideBar'
import { Separator } from '../ui/separator'

const Carousel = () => {
  return (
    <Layout>
        <div className='flex w-full'>
            <SideBar/>
            <Separator orientation='vertical' className='w-[1px] h-[384px]'/>
            <Banner/>
        </div>
    </Layout>
  )
}

export default Carousel