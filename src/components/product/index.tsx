'use client'

import { Eye, Heart } from 'lucide-react'
import React from 'react'

const Product = () => {
  return (
    <div>
        <div className='relative'>
            <img src="assets/images/product.png" alt="" className='w-[270px]'/>
            <span className='px-[12px] py-[4px] bg-secondary2 text-text text-[12px] rounded-[4px]'>-40%</span>
            <div>
                <span><Heart/></span>
                <span><Eye/></span>
            </div>
            <div>Add To Cart</div>
        </div>
        <div className='flex flex-col gap-[8px]'>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
        </div>
    </div>
  )
}

export default Product