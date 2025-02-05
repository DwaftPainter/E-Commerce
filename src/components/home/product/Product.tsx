'use client'

import { Eye, Heart, Trash2 } from 'lucide-react'
import React from 'react'
import StarRating from './StarRating'
import Link from 'next/link'
import { Product as ProductType } from '@/lib/models/ProductModel'

interface ProductProps {
    product: ProductType
    isWishlist?: boolean
}

const Product = ({ product, isWishlist }: ProductProps) => {
    const [rating, setRating] = React.useState(0)

    return (
        <div className='max-w-[270px] flex flex-col gap-[16px]'>
            <div className='relative rounded-[4px] group cursor-pointer'>
                <img src={product.image} alt='' className='w-[270px] h-[250px] rounded-sm' />
                {product.discount !== 0 && (
                    <span className='px-[12px] py-[6px] bg-secondary2 text-text text-[12px] rounded-[4px] absolute top-[12px] left-[12px]'>
                        -{product?.discount}%
                    </span>
                )}
                <div className='flex flex-col gap-[8px] absolute top-[12px] right-[12px] z-10'>
                    {isWishlist ? (
                        <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                            <Trash2 size={20} />
                        </span>
                    ) : (
                        <>
                            <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                                <Heart size={20} />
                            </span>
                            <Link href={`product/${product.slug}`}>
                                <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                                    <Eye size={20} />
                                </span>
                            </Link>
                        </>
                    )}
                </div>
                <div className='bg-black text-text text-center w-full font-medium py-[8.5px] absolute bottom-0 rounded-bl-[4px] rounded-br-[4px] cursor-pointer  hidden group-hover:block'>
                    Add To Cart
                </div>
            </div>
            <div className='flex flex-col gap-[8px]'>
                <p className='font-medium truncate'>{product?.name}</p>
                <div className='flex gap-[12px] font-medium'>
                    <p className='text-secondary2'>
                        ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                    </p>
                    {product.discount !== 0 && (
                        <p className='text-black opacity-50 line-through'>${product.price}</p>
                    )}
                </div>
                {isWishlist ? (
                    <></>
                ) : (
                    <StarRating
                        totalStars={5}
                        initialRating={product.rating}
                        readOnly={true}
                        review={product.review}
                    />
                )}
            </div>
        </div>
    )
}

export default Product
