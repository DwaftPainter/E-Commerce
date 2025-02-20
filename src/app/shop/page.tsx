'use client'

import React from 'react'
import ProductDisplay from '@/components/shop/product-display'
import ShopSidebar from '@/components/shop/side-bar'
import { ShopProvider } from '@/context/ShopConntext'
import Loading2 from '@/components/ui/loading2'

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
                    <ShopSidebar className='w-[20%]' />
                    <ProductDisplay className='w-[80%]' />
                </div>           
            </ShopProvider>
        </React.Suspense>
    )
}

export default page
