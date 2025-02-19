'use client'

import StarRating from '@/components/home/product/StarRating'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Heart, Minus, Plus, RefreshCcw, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HomeLayout from '@/layouts/HomeLayout'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { products } from '@/mock_data'
import Product from '@/components/home/product/Product'
import { usePathname, useRouter } from 'next/navigation'
import Loading from '@/components/ui/loading'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAppContext } from '@/context/AppContext'
import { motion } from 'framer-motion'
import { ProductType } from '@/types/product.type'

const page = () => {
    const [product, setProduct] = React.useState<any>({})
    const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined)
    const [size, setSize] = React.useState(null)
    const [quantity, setQuantity] = React.useState(1)
    const [loading, setLoaing] = React.useState(true)
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const slug = usePathname().split('/').pop()
    const { wishItems, addToWishList, addToCart } = useAppContext()
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
                const response = await fetch(`/api/product/${slug}`)
                const { data } = await response.json()
                setProduct(data)
            } catch (error: any) {
                console.log('Failed to fetch product: ' + error.message)
            } finally {
                setLoaing(false)
                console.log(product)
            }
        }

        getData()
    }, [])

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToWishListClick = (product: ProductType, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addToWishList(product)
    }

    const handleBuyProduct = (product: ProductType, quantity: number) => {
        addToCart(product, quantity)
        router.push('/cart')
    }

    if (loading) {
        return (
            <div className='w-full min-h-[500px] flex items-center justify-center'>
                <Loading />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-[140px]'>
            <div className='flex gap-[70px]'>
                <div className='grid grid-cols-4 grid-rows-3 gap-y-[15px] gap-x-[30px] basis-[60%]'>
                    <img src={product?.image} className='row-[1/2] col-[1/2] rounded-sm h-full' />
                    <img src={product?.image} className='row-[2/3] col-[1/2] rounded-sm h-full' />
                    <img src={product?.image} className='row-[3/4] col-[1/2] rounded-sm h-full' />
                    <img src={product?.image} className='row-[1/4] col-[2/5] w-full h-full rounded-sm' />
                </div>
                <div className='basis-[40%] flex flex-col gap-[30px] h-auto'>
                    <div className='flex flex-col gap-[24px] h-auto'>
                        <h1 className='font-semibold text-[24px] leading-none'>{product?.name}</h1>
                        <div className='flex gap-[16px] items-center'>
                            <StarRating
                                initialRating={product?.rating}
                                totalStars={5}
                                review={product?.review}
                                readOnly={true}
                            />
                            <Separator
                                orientation='vertical'
                                className='h-[16px] w-[1px] bg-black opacity-50'
                            />
                            {product?.countInStock > 0 ? (
                                <p className='text-[14px] text-button1'>In Stock</p>
                            ) : (
                                <p className='text-[14px] text-red-500'>Sold Out</p>
                            )}
                        </div>
                        <div className='flex gap-5'>
                            <h1 className='text-[24px]'>
                                ${(product?.price - (product?.price * product?.discount) / 100).toFixed(2)}
                            </h1>
                            {product?.discount > 0 && (
                                <h1 className='text-[24px] text-black opacity-50 line-through'>
                                    ${(product?.price).toFixed(2)}
                                </h1>
                            )}
                        </div>
                        <p className='text-[14px]'>{product?.description}</p>
                    </div>
                    <Separator className='bg-black opacity-50' />
                    <div className='flex flex-col gap-11'>
                        <div className='flex flex-col gap-4'>
                            {product?.colors.length !== 0 && (
                                <div className='flex gap-4 items-center'>
                                    <p className='text-[20px]'>Colours: </p>
                                    <ToggleGroup
                                        value={selectedColor}
                                        onValueChange={setSelectedColor}
                                        type='single'
                                        className='flex items-center h-full'
                                    >
                                        {product?.colors.map((color: string, index: number) => (
                                            <div
                                                key={index}
                                                className={`rounded-full border-2 flex items-center justify-center p-0.5 ${
                                                    selectedColor === color
                                                        ? 'border-gray-900'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                <ToggleGroupItem
                                                    value={color}
                                                    id={color}
                                                    className={`h-3 w-3 rounded-full p-0 min-w-0`}
                                                    style={{ backgroundColor: color }}
                                                    aria-label={`Select ${color} color`}
                                                />
                                            </div>
                                        ))}
                                    </ToggleGroup>
                                </div>
                            )}
                            {product?.sizes.length !== 0 && (
                                <div className='flex gap-6 items-center'>
                                    <p className='text-[20px]'>Size: </p>
                                    <div className='flex gap-[16px]'>
                                        {product?.sizes.map((size: string, index: number) => (
                                            <div
                                                className='flex items-center justify-center h-8 w-8 border rounded-sm hover:bg-secondary2 hover:text-text cursor-pointer'
                                                key={index}
                                            >
                                                <p className='text-[14px] font-medium'>{size}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className='w-full flex gap-4 items-center'>
                                <div className='grid grid-cols-4'>
                                    <button
                                        onClick={decreaseQuantity}
                                        className='col-[1/2] py-[10px] px-[5px] flex justify-center items-center rounded-tl-sm rounded-bl-sm border'
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className='w-20 h-10 border-t border-b col-[2/4] flex items-center justify-center font-medium text-[20px]'>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={increaseQuantity}
                                        className='col-[4/5] py-[10px] px-[5px] flex justify-center items-center rounded-tr-sm rounded-br-sm bg-button2 hover:bg-hover2'
                                    >
                                        <Plus color='white' size={16} />
                                    </button>
                                </div>
                                <Button
                                    className='py-[10px] px-[48px] rounded-sm font-medium bg-button2 hover:bg-hover2 h-auto'
                                    onClick={() => handleBuyProduct(product, quantity)}
                                >
                                    Buy Now
                                </Button>
                                <button
                                    className='w-10 h-10 flex justify-center items-center border rounded-sm cursor-pointer'
                                    onClick={e => {
                                        handleAddToWishListClick(product, e)
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: wishItems.find(item => item._id === product._id)
                                                ? [1, 1.2, 1]
                                                : 1,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className={`${
                                                wishItems.find(item => item._id === product._id)
                                                    ? 'fill-red-500 stroke-red-500'
                                                    : 'stroke-black'
                                            } transition-colors duration-300`}
                                        />
                                    </motion.div>
                                </button>
                            </div>
                        </div>
                        <div className='w-full py-4 border-[1px] border-black border-opacity-50 rounded-sm flex flex-col gap-4'>
                            <div className='flex items-center gap-4'>
                                <Truck className='ml-4' size={40} />
                                <div className='flex flex-col gap-2'>
                                    <p className='font-medium'>Free Delivery</p>
                                    <p className='font-medium text-[12px] hover:underline cursor-pointer'>
                                        Enter your postal code for Delivery Availability
                                    </p>
                                </div>
                            </div>
                            <Separator className='bg-black opacity-50' />
                            <div className='flex items-center gap-4'>
                                <RefreshCcw className='ml-4' size={40} />
                                <div className='flex flex-col gap-2'>
                                    <p className='font-medium'>Return Delivery</p>
                                    <p className='font-medium text-[12px] hover:underline cursor-pointer'>
                                        Free 30 Days Delivery Returns. Details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeLayout title='Related Item'>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    setApi={setApi}
                    className='w-full mt-[23px]'
                >
                    <CarouselContent>
                        {products?.map((product, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
                                <div className='p-1'>
                                    <Product product={product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </HomeLayout>
        </div>
    )
}

export default page
