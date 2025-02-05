'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React, { useEffect } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '../../ui/button'
import Product from './Product'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Products = () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [products, setProducts] = React.useState<any[]>([])  // Add state for products
    const [loading, setLoading] = React.useState(true)  // Add loading state

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
                const response = await fetch('http://localhost:3000/api/product/explore')
                const {data} = await response.json()  // Ensure response is parsed correctly
                setProducts(data)  // Set products in state
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setLoading(false)  // Set loading to false once data is fetched
            }
        }

        getData()
    }, [])

    if (loading) {
        return <div>Loading...</div>  // Render loading indicator until data is available
    }
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
                    {products?.map((product, index) => (
                        <CarouselItem key={index} className='lg:basis-1/5'>
                            <div className='p-1'>
                                <Product product={product} />
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
