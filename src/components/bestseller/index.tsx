import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Button } from '../ui/button'
import Product from '../product/Product'
import Image from 'next/image'

const BestSeller = () => {
    return (
        <HomeLayout title='This Month' className='w-full flex flex-col gap-[65px] mb-[80px]'>
          <div>
            <div className='flex justify-between mt-[24px]'>
                <h1 className='text-[36px] font-semibold mb-[40px]'>Best Selling Products</h1>
                <Button className='bg-secondary2 hover:bg-hover2 rounded-[4px] h-[56px] px-[48px] py-[16px] font-medium'>
                    View All
                </Button>
            </div>
            <div className='flex -ml-6 '>
              {Array.from({ length: 5 }).map((_, index) => (
                <div className='min-w-0 shrink-0 grow-0 lg:basis-1/5 pl-6' key={index}>
                    <Product />
                </div>
              ))}
            </div>
          </div>
            <div className='w-full h-full'>
              <img src="assets/images/banner1.jpg" className='w-full'/>
            </div>
        </HomeLayout>
    )
}

export default BestSeller
