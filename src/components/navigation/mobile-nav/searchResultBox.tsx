import React from 'react'
import { ProductType } from '@/types/product.type'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
    products: ProductType[],
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string,
}

const SearchResultBox = ({ products, setOpen, className }: Props) => {
    return (
        <div className={cn('flex flex-col w-full border rounded-sm mt-5', className)}>
            {products?.length > 0 &&
                products?.slice(0, 7).map((product, index) => (
                    <div className='flex items-center justify-between px-2 py-3' key={index}>
                        <div className='flex items-center max-w-[300px]'>
                            <img src={product?.image} alt='' className='h-[42px] w-[42px] mr-2 rounded-sm' />
                            <p className='text-sm font-semibold'>{product?.name}</p>
                        </div>
                        <div className='text-center'>
                            {product?.discount > 0 ? (
                                <>
                                    <p className='line-through text-[12px] text-[#C2C2D3]'>
                                        ${(product?.price).toFixed(2)}
                                    </p>
                                    <p className='text-secondary2 text-sm font-semibold'>
                                        $
                                        {(
                                            product?.price -
                                            (product?.price * product?.discount) / 100
                                        ).toFixed(2)}
                                    </p>
                                </>
                            ) : (
                                <p className='text-secondary2 text-sm font-semibold'>
                                    ${(product?.price).toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            <Link
                href={'/shop'}
                className='self-center my-2 cursor-pointer'
                onClick={() => setOpen?.(prev => !prev)}
            >
                See all product({products?.length})...
            </Link>
        </div>
    )
}

export default SearchResultBox
