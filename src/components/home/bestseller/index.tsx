import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Button } from '../../ui/button'
import Product from '../product/Product'
import FlashSaleBanner from '../product/FlashSaleBanner'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/AppContext'

const BestSeller = () => {
    const { previewProducts } = useAppContext()
    const router = useRouter()

    return (
        <HomeLayout title='This Month' className='w-full flex flex-col sm:gap-[65px] gap-10 sm:mb-20 mb-10'>
            <div>
                <div className='flex justify-between items-center mt-[24px] sm:mb-[40px] mb-6'>
                    <h1 className='sm:text-[36px] text-[18px] h-fit font-semibold'>Best Selling Products</h1>
                    <Button
                        className='bg-secondary2 hover:bg-hover2 rounded-[4px] sm:h-[56px] h-[48px] sm:px-[48px] px-4 sm:py-4 py-2 font-medium'
                        onClick={() => router.push('/shop')}
                    >
                        View All
                    </Button>
                </div>
                <div className='sm:flex grid grid-cols-2 -ml-6 overflow-x-hidden gap-y-3'>
                    {previewProducts?.map((product, index) => (
                        <div
                            className='min-w-0 shrink-0 grow-0 lg:basis-1/5 md:basis-1/4 sm:basis-1/3 pl-6'
                            key={index}
                        >
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <FlashSaleBanner />
        </HomeLayout>
    )
}

export default BestSeller
