'use client'

import * as React from 'react'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import HomeLayout from '@/layouts/HomeLayout'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CountdownClock from './Clock'
import { Button } from '@/components/ui/button'
import Product from '../product/Product'
import { Separator } from '@/components/ui/separator'

function Today() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [products, setProducts] = React.useState<any[]>([])
    const [event, setEvent] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    React.useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`)
                const {data, products} = await response.json()  // Ensure response is parsed correctly
                setProducts(products)
                setEvent(data[0])  // Set products in state
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])

    if (loading) {
        return <div className='flex justify-center items-center'>Loading...</div>
    }
    

    return (
        <HomeLayout title="Today's" className='flex flex-col gap-[65px]'>
            <Carousel
                opts={{
                    align: 'start'
                }}
                setApi={setApi}
                className='w-full'
            >
                <div className='relative'>
                    <div className='flex items-end gap-[87px] mb-[40px]'>
                        <h1 className='text-[36px] font-semibold '>{event?.name}</h1>
                        <CountdownClock startDate={event?.startDate} endDate={event?.endDate}/>
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
                    {products?.map((product, index) => (
                        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
                            <div className='p-1'>
                                <Product product={product}/>
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
            <Separator className='mb-[80px]'/>
        </HomeLayout>
    )
}

export default Today
