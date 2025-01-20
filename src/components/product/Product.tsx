'use client'

import { Eye, Heart } from 'lucide-react'
import React from 'react'
import StarRating from './StarRating'

const Product = () => {
    const [rating, setRating] = React.useState(0)

    return (
        <div className='max-w-[270px] flex flex-col gap-[16px]'>
            <div className='relative rounded-[4px] group'>
                <img src='assets/images/product.png' alt='' className='w-[270px] h-[250px]' />
                <span className='px-[12px] py-[6px] bg-secondary2 text-text text-[12px] rounded-[4px] absolute top-[12px] left-[12px]'>
                    -40%
                </span>
                <div className='flex flex-col gap-[8px] absolute top-[12px] right-[12px] z-10'>
                    <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                        <Heart size={20} />
                    </span>
                    <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                        <Eye size={20} />
                    </span>
                </div>
                <div className='bg-black text-text text-center w-full font-medium py-[8.5px] absolute bottom-0 rounded-bl-[4px] rounded-br-[4px] cursor-pointer  hidden group-hover:block'>
                    Add To Cart
                </div>
            </div>
            <div className='flex flex-col gap-[8px]'>
                <p className='font-medium'>HAVIT HV-G92 Gamepad</p>
                <div className='flex gap-[12px] font-medium'>
                    <p className='text-secondary2'>$120</p>
                    <p className='text-black opacity-50 line-through'>$160</p>
                </div>
                <StarRating 
                  totalStars={5}
                  initialRating={4}
                  readOnly={true}
                  review={80}
                />
            </div>
        </div>
    )
}

export default Product
