'use client'

import * as React from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import HomeLayout from '@/layouts/HomeLayout'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CountdownClock from './Clock'
import { Button } from '@/components/ui/button'
import Product from '../product/Product'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'

function Today() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [products, setProducts] = React.useState<any[]>([])
    const [event, setEvent] = React.useState<any>({})
    const [loading, setLoading] = React.useState(true)
    const router = useRouter()

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
                const response = await fetch(`/api/event`)
                const { data, products } = await response.json() // Ensure response is parsed correctly
                setProducts(products)
                setEvent(data[0]) // Set products in state
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [])

    if (loading) {
        return (
            <HomeLayout
                title="Today's"
                className='flex-col gap-4 w-full flex items-center justify-center min-h-[500px]'
            >
                <div className='w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full'>
                    <div className='w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full'></div>
                </div>
            </HomeLayout>
        )
    }

    return (
        <HomeLayout title="Today's" className='flex flex-col lg:gap-[65px] gap-8'>
            <Carousel
                opts={{
                    align: 'start'
                }}
                setApi={setApi}
                className='w-full'
            >
                <div className='relative sm:mt-0 mt-4'>
                    <div className='flex sm:items-end sm:gap-[87px] sm:justify-normal justify-between items-start sm:mb-10 mb-6 '>
                        <h1 className='sm:text-[36px] sm:leading-[3.5rem] text-xl leading-none font-semibold '>{event?.name}:</h1>
                        <CountdownClock startDate={event?.startDate} endDate={event?.endDate} />
                    </div>
                    <div className='absolute right-0 top-0 lg:flex gap-[10px] z-10 hidden'>
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
                        <CarouselItem key={index} className='basis-1/2 sm:basis-1/3 lg:basis-1/5 md:basis-1/4'>
                            <div className='p-1'>
                                <Product product={product} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className='w-full flex justify-center items-center'>
                <Button
                    className='bg-secondary2 hover:bg-hover2 rounded-sm sm:h-[56px] min-h-[48px] sm:px-[48px] px-4 sm:py-4 py-2 font-medium'
                    onClick={() => router.push('/shop?status=onsale')}
                >
                    View All Products
                </Button>
            </div>
            <Separator className='lg:mb-20 sm:mb-16 mb-10' />
        </HomeLayout>
    )
}

export default Today
