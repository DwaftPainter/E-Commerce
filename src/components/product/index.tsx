'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '../ui/button'
import Product from './Product'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Products = () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <HomeLayout title='Our Products' className='flex flex-col gap-[65px] mb-[65px]'>
            <Carousel setApi={setApi} className='w-full mt-[24px]'>
                <div className='relative'>
                    <div className='flex items-end gap-[87px] mb-[40px]'>
                        <h1 className='text-[36px] font-semibold '>Explore Our Products</h1>
                    </div>
                    <div className='absolute right-0 top-0 flex gap-[10px] z-10'>
                        <Button
                            className='bg-secondary w-[46px] h-[46px] rounded-full'
                            onClick={() => api?.scrollTo(current - 1)}
                        >
                            <ArrowLeft color='black' />
                        </Button>
                        <Button
                            className='bg-secondary w-[46px] h-[46px] rounded-full p-0'
                            onClick={() => api?.scrollTo(current + 1)}
                        >
                            <ArrowRight color='black' />
                        </Button>
                    </div>
                </div>
                <CarouselContent className='gird grid-cols-5 grid-rows-2'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem key={index} className='lg:basis-1/5'>
                            <div className='p-1'>
                                <Product />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className='w-full flex justify-center items-center'>
                <Button className='bg-secondary2 hover:bg-hover2 rounded-[4px] h-[56px] px-[48px] py-[16px] font-medium'>
                    View All Products
                </Button>
            </div>
        </HomeLayout>
    )
}

export default Products
