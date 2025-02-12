'use client'

import BestSeller from '@/components/home/bestseller'
import Carousel from '@/components/home/carousel'
import Categories from '@/components/home/categories'
import Feature from '@/components/home/feature'
import Products from '@/components/home/product'
import Today from '@/components/home/today'
import { Button } from '@/components/ui/button'
import { validate } from '@/config/message'
import { useAppContext } from '@/context/AppContext'
import { getAuthToken } from '@/helper/session'
import { ArrowUp } from 'lucide-react'
import React from 'react'
import Cookies from 'js-cookie'

export default function Home() {
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <>
            <div>
                <Carousel />
                <Today />
                <Categories />
                <BestSeller />
                <Products />
                <Feature />
            </div>
            <Button
                className='bg-secondary w-[46px] h-[46px] rounded-full p-0 absolute hidden'
                onClick={() => scrollToTop()}
            >
                <ArrowUp color='black' />
            </Button>
        </>
    )
}
