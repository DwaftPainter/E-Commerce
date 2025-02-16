'use client'

import React from 'react'
import ProductDisplay from '@/components/shop/product-display'
import ShopSidebar from '@/components/shop/side-bar'
import { ShopProvider } from '@/context/ShopConntext'

const page = () => {

    return (
        <ShopProvider>
            <div className='w-full flex gap-11'>
                <ShopSidebar className='w-[20%]' />
                <ProductDisplay
                    className='w-[80%]'
                />
            </div>
        </ShopProvider>
    )
}

export default page
