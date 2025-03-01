'use client'

import React from 'react'
import ShopSidebar from '@/app/shop/components/side-bar'
import { ShopProvider } from '@/context/ShopConntext'
import Loading2 from '@/components/ui/loading2'
import ProductDisplay from './components/product-display'

const page = () => {
    return (
        <React.Suspense
            fallback={
                <div className='flex w-full min-h-[500px] justify-center items-center'>
                    <Loading2 />
                </div>
            }
        >
            <ShopProvider>
                <div className='w-full flex gap-11'>
                    <ShopSidebar className='w-[20%] lg:flex hidden' />
                    <ProductDisplay className='lg:w-[80%] w-full' />
                </div>           
            </ShopProvider>
        </React.Suspense>
    )
}

export default page
