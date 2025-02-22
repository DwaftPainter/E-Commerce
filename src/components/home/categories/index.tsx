'use client'

import React from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import HomeLayout from '@/layouts/HomeLayout'
import { ArrowLeft, ArrowRight, Phone, Smartphone } from 'lucide-react'
import { Button } from '../../ui/button'
import Category from './category'
import { Separator } from '../../ui/separator'
import { categories } from '@/utils/constants'

const Categories = () => {
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
        <HomeLayout title='Categories' className='flex flex-col sm:gap-[65px] gap-8'>
            <Carousel
                opts={{
                    align: 'start'
                }}
                setApi={setApi}
                className='w-full'
            >
                <div className='relative mt-[24px]'>
                    <div className='flex items-end gap-[87px] sm:mb-[40px] mb-6'>
                        <h1 className='sm:text-[36px] text-[18px] font-semibold '>Browse By Category</h1>
                    </div>
                    <div className='absolute right-0 top-0 sm:flex gap-[10px] z-10 hidden'>
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
                <CarouselContent className='sm:flex grid grid-cols-2 sm:gap-0 gap-3 sm:-ml-4 -ml-0'>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className='lg:basis-1/7 md:basis-1/5 sm:basis-1/4 basis-1/2 sm:pl-4 pl-0'>
                            <Category name={category?.name} icon={category?.icon} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Separator className='lg:mb-20 sm:mb-16 mb-10'/>
        </HomeLayout>
    )
}

export default Categories
