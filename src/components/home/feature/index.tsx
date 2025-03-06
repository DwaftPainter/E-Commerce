'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext'
import Loading2 from '@/components/ui/loading2'

const Feature = () => {
    const { featureProducts } = useAppContext()
    
    const category = {
        _id: '12352',
        name: "Women'Collections",
        description: 'Featured woman collections that give you another vibe.',
        image: '/assets/images/woman-collections.png'
    }

    if (!featureProducts) {
        return (
            <HomeLayout
                title='Featured'
                className='flex flex-col lg:gap-[135px] gap-10 items-center justify-center'
            >
                <Loading2 />
            </HomeLayout>
        )
    }

    return (
        <HomeLayout
            title='Featured'
            className='flex flex-col lg:gap-[135px] gap-10 items-center justify-center'
        >
            <div className='flex flex-col gap-10 mt-6 w-full'>
                <h1 className='sm:text-[36px] sm:leading-[3.5rem] text-xl leading-none font-semibold md:mb-10'>
                    New Arrival
                </h1>
                <div className='lg:grid flex flex-col grid-cols-[2fr,1fr,1fr] grid-rows-2 gap-[30px]'>
                    <div
                        style={{ backgroundImage: `url(${featureProducts?.[0]?.image || '/assets/images/placeholder-image.jpg'})` }}
                        className={`flex flex-col gap-3 items-start justify-end rounded-[4px] lg:min-h-[700px] sm:min-h-[500px] min-h-[400px] row-start-1 row-end-3 col-start-1 col-end-2 p-7 bg-cover bg-center text-white`}
                    >
                        <h1 className='font-semibold text-2xl'>{featureProducts[0]?.name}</h1>
                        <p className='text-[14px]'>{featureProducts[0]?.description}</p>
                        <Link href={`/product/${featureProducts[0]?.slug}`} className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${category.image || '/assets/images/placeholder-image.jpg'})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] lg:min-h-[50px] sm:min-h-[300px] col-start-2 col-end-4 text-white bg-cover p-7 bg-center'
                    >
                        <h1 className='font-semibold text-2xl'>{category.name}</h1>
                        <p className='text-[14px]'>{category.description}</p>
                        <Link href='/shop?filter_cat=8,801,802,803,804' className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${featureProducts[1]?.image || '/assets/images/placeholder-image.jpg'})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] lg:min-h-[50px] sm:min-h-[500px] min-h-[350px] p-7 bg-cover text-white bg-center'
                    >
                        <h1 className='font-semibold text-2xl'>{featureProducts[1]?.category}</h1>
                        <p className='text-[14px]'>{featureProducts[1]?.name}</p>
                        <Link href={`/product/${featureProducts[1]?.slug}`} className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${featureProducts[2]?.image || '/assets/images/placeholder-image.jpg'})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] lg:min-h-[50px] sm:min-h-[500px] min-h-[350px] p-7 bg-cover bg-center text-white'
                    >
                        <h1 className='font-semibold text-2xl'>{featureProducts[2]?.category}</h1>
                        <p className='text-[14px]'>{featureProducts[2]?.name}</p>
                        <Link href={`/product/${featureProducts[2]?.slug}`} className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex md:flex-row flex-col justify-around items-start mx-auto w-full gap-6'>
                <div className='flex md:flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon-delivery.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] md:items-center md:text-center items-start'>
                        <p className='font-semibold md:text-[20px]'>FREE AND FAST DELIVERY</p>
                        <p className='text-[14px]'>Free delivery for all order over $140</p>
                    </div>
                </div>
                <div className='flex md:flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon_customer_service.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] md:items-center md:text-center items-start'>
                        <p className='font-semibold md:text-[20px]'>24/7 CUSTOMER SERVICE</p>
                        <p className='text-[14px]'>Friendly 24/7 customer support</p>
                    </div>
                </div>
                <div className='flex md:flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon_secure.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] md:items-center md:text-center items-start'>
                        <p className='font-semibold md:text-[20px]'>MONEY BACK GUARANTEE</p>
                        <p className='text-[14px]'>We return money within 30 days</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Feature
