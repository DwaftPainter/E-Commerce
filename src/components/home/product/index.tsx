'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '../../ui/button'
import Product from './Product'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProductType } from '@/types/product.type'
import { useAppContext } from '@/context/AppContext'

const Products = () => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const { previewProducts } = useAppContext()

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
        <HomeLayout
            title='Our Products'
            className='flex flex-col sm:gap-[65px] gap-10 lg:mb-[65px] sm:mb-16 mb-10'
        >
            <Carousel
                opts={{
                    align: 'start'
                }}
                setApi={setApi}
                className='w-full mt-[24px]'
            >
                <div className='relative'>
                    <div className='flex items-end gap-[87px] sm:mb-[40px] mb-6'>
                        <h1 className='sm:text-[36px] sm:leading-[3.5rem] text-xl leading-none font-semibold'>
                            Explore Our Products
                        </h1>
                    </div>
                    <div className='absolute right-0 top-0 sm:flex hidden gap-[10px] z-10'>
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
                {/* <CarouselContent className='gird sm:grid-cols-5 grid-cols-2 grid-rows-2'> */}
                <CarouselContent>
                    {previewProducts &&
                        previewProducts
                            .reduce<ProductType[][]>((acc, _, index) => {
                                if (index % 2 === 0) {
                                    acc.push(previewProducts.slice(index, index + 2))
                                }
                                return acc
                            }, [])
                            .map((pair: ProductType[], index: number) => (
                                <CarouselItem
                                    key={index}
                                    className='lg:basis-1/5 md:basis-1/4 sm:basis-1/3 basis-1/2'
                                >
                                    <div className='p-1 grid grid-cols-1 gap-[60px]'>
                                        {pair.map((product, i) => (
                                            <Product key={i} product={product} />
                                        ))}
                                    </div>
                                </CarouselItem>
                            ))}
                </CarouselContent>
            </Carousel>
            <div className='w-full flex justify-center items-center'>
                <Button className='bg-secondary2 hover:bg-hover2 rounded-sm sm:h-[56px] min-h-[48px] sm:px-[48px] px-4 sm:py-4 py-2 font-medium'>
                    View All Products
                </Button>
            </div>
        </HomeLayout>
    )
}

export default Products
