'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Facebook, Instagram, Linkedin, SendHorizontal, Twitter } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

const Footer = () => {
  return (
      <div className='bg-black w-full lg:mt-[140px] mt-16'>
        <div className='flex lg:flex-row flex-col lg:gap-0 gap-8 justify-between 2xl:px-[200px] xl:px-16 md:px-10 px-4 sm:pt-[80px] py-10 sm:pb-[65px] text-white'>
          <div className='flex flex-col gap-[24px]'>
            <h1 className='text-[24px] font-bold'>Neo Store</h1>
            <h2 className='text-[20px] font-medium'>Subcribe</h2>
            <p className='text-[16px]'>Get 10% off your first order</p>
            <div className='relative'>
              <Input type='email' placeholder='Enter your email' className='bg-transparent border-white text-text pl-[16px] pr-[30px] py-[20px]'/>
              <div className='absolute top-3 right-3'>
                <SendHorizontal size={'20'}/>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <h2 className='text-[20px] font-medium'>Support</h2>
            <div className='flex flex-col gap-[16px] w-[170px]'>
              <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
              <p>neostore@gmail.com</p>
              <p>+840912345678</p>
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <h2 className='text-[20px] font-medium'>Account</h2>
            <div className='flex flex-col gap-[16px]'>
              <p>My Account</p>
              <p>Login / Register</p>
              <p>Cart</p>
              <p>Wishlist</p>
              <p>Shop</p>
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <h2 className='text-[20px] font-medium'>Quick Link</h2>
            <div className='flex flex-col gap-[16px]'>
              <p>Privacy Policy</p>
              <p>Terms Of Use</p>
              <p>FAQ</p>
              <p>Contact</p>
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <h2 className='text-[20px] font-medium'>Dowload App</h2>
            <div className='flex flex-col gap-[8px]'>
              <p className='text-[12px] opacity-70'>Save $3 with App New User Only</p>
              <div className='flex gap-[8px]'>
                <img src={'/assets/images/GitQR.png'} className='w-[76px]'/>
                <div className='flex flex-col gap-[8px] justify-center items-center'>
                  <img src="/assets/images/google-play.png" alt="" className='cursor-pointer h-[30px] w-[104px]'/>
                  <img src="/assets/images/app-store.png" alt="" className='cursor-pointer h-[34px] w-[104px]'/>
                </div>
              </div>
            </div>
            <div className='flex gap-[16px] items-center'>
              <Button size={'icon'} className='bg-transparent hover:bg-transparent p-0'>
                <Facebook />
              </Button>
              <Button size={'icon'} className='bg-transparent hover:bg-transparent p-0'>
                <Twitter />
              </Button>
              <Button size={'icon'} className='bg-transparent hover:bg-transparent p-0'>
                <Instagram />
              </Button>
              <Button size={'icon'} className='bg-transparent hover:bg-transparent p-0'>
                <Linkedin />
              </Button>
            </div>
          </div>
        </div>
        <Separator className='bg-primary opacity-20'/>
        <div className='h-[65px] w-full flex items-center justify-center'>
          <p className='text-primary opacity-20 sm:text-[16px] text-sm'>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
  )
}

export default Footer