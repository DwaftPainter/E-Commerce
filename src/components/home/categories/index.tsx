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
        <HomeLayout title='Categories' className='flex flex-col gap-[65px]'>
            <Carousel
                opts={{
                    align: 'start'
                }}
                setApi={setApi}
                className='w-full'
            >
                <div className='relative mt-[24px]'>
                    <div className='flex items-end gap-[87px] mb-[40px]'>
                        <h1 className='text-[36px] font-semibold '>Browse By Category</h1>
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
                <CarouselContent>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className='lg:basis-1/7'>
                            <Category name={category?.name} icon={category?.icon} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Separator className='mb-[80px]'/>
        </HomeLayout>
    )
}

export default Categories
