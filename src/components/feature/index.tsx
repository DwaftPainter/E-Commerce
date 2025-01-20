'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowDown, ArrowUp } from 'lucide-react'

const Feature = () => {

    return (
        <HomeLayout title='Featured' className='flex flex-col gap-[135px] items-center justify-center'>
            <div className='flex flex-col gap-[40px] mt-[24px] w-full'>
                <h1 className='text-[36px] font-semibold mb-[40px]'>New Arrival</h1>
                <div className='grid grid-cols-[2fr,1fr,1fr] grid-rows-2 gap-[30px]'>
                    <div className='flex items-center justify-center rounded-[4px] min-h-[600px] border-[1px] border-black row-start-1 row-end-3 col-start-1 col-end-2 '>
                        item1
                    </div>
                    <div className='flex items-center justify-center rounded-[4px] min-[50px] border-[1px] border-black col-start-2 col-end-4'>
                        item2
                    </div>
                    <div className='flex items-center justify-center rounded-[4px] min-h-[50px] border-[1px] border-black'>
                        item3
                    </div>
                    <div className='flex items-center justify-center rounded-[4px] min-h-[50px] border-[1px] border-black'>
                        item4
                    </div>
                </div>
            </div>
            <div className='flex justify-around w-full'>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src="assets/icons/icon-delivery.png" alt="" />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>FREE AND FAST DELIVERY</p>
                        <p className='text-[14px]'>Free delivery for all order over $140</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src="assets/icons/icon-customer-service.png" alt="" />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>24/7 CUSTOMER SERVICE</p>
                        <p className='text-[14px]'>Friendly 24/7 customer support</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src="assets/icons/icon-secure.png" alt="" />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>MONEY BACK GUARANTEE</p>
                        <p className='text-[14px]'>We return money within 30 days</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Feature
