'use client'

import HomeLayout from '@/layouts/HomeLayout'
import React from 'react'
import { Button } from '../../ui/button'
import Link from 'next/link'

const Feature = () => {
    const product = [
        {
            _id: '12350',
            name: 'PlayStation 5',
            slug: 'asus-rog-strix-rtx-4080-gpu',
            description: 'Black and White version of the PS5 coming out on sale.',
            price: 1400,
            discount: 100,
            review: 45,
            rating: 4.9,
            countInStock: 5,
            image: '/assets/images/playstation.png'
        },
        {
            _id: '12351',
            name: 'Amazon wireless speakers',
            slug: 'dell-ultrasharp-u2723qe-monitor',
            category: 'Speakers',
            description: 'A 27-inch 4K UHD monitor with exceptional color accuracy and clarity.',
            price: 750,
            discount: 50,
            review: 90,
            rating: 4.6,
            countInStock: 7,
            image: '/assets/images/speaker.png'
        },
        {
            _id: '12352',
            name: 'GUCCI INTENSE OUD EDP',
            slug: 'hyperx-cloud-ii-gaming-headset',
            category: 'Perfume',
            description: 'A durable and comfortable headset with 7.1 surround sound for gaming.',
            price: 100,
            discount: 25,
            review: 250,
            rating: 4.4,
            countInStock: 20,
            image: '/assets/images/gucci.png'
        }
    ]

    const category = {
        _id: '12352',
        name: "Women'Collections",
        description: 'Featured woman collections that give you another vibe.',
        image: '/assets/images/woman-collections.png'
    }

    return (
        <HomeLayout title='Featured' className='flex flex-col gap-[135px] items-center justify-center'>
            <div className='flex flex-col gap-[40px] mt-[24px] w-full'>
                <h1 className='text-[36px] font-semibold mb-[40px]'>New Arrival</h1>
                <div className='grid grid-cols-[2fr,1fr,1fr] grid-rows-2 gap-[30px]'>
                    <div
                        style={{ backgroundImage: `url(${product[0].image})` }}
                        className={`flex flex-col gap-3 items-start justify-end rounded-[4px] min-h-[700px] row-start-1 row-end-3 col-start-1 col-end-2 p-7 bg-cover text-white`}
                    >
                        <h1 className='font-semibold text-2xl'>{product[0].name}</h1>
                        <p className='text-[14px]'>{product[0].description}</p>
                        <Link href='/' className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${category.image})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] min-[50px] col-start-2 col-end-4 text-white bg-cover p-7'
                    >
                        <h1 className='font-semibold text-2xl'>{category.name}</h1>
                        <p className='text-[14px]'>{category.description}</p>
                        <Link href='/' className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${product[1].image})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] min-h-[50px] p-7 bg-cover text-white'
                    >
                        <h1 className='font-semibold text-2xl'>{product[1].category}</h1>
                        <p className='text-[14px]'>{product[1].name}</p>
                        <Link href='/' className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${product[2].image})` }}
                        className='flex flex-col gap-3 items-start justify-end rounded-[4px] min-h-[50px] p-7 bg-cover text-white'
                    >
                        <h1 className='font-semibold text-2xl'>{product[2].category}</h1>
                        <p className='text-[14px]'>{product[2].name}</p>
                        <Link href='/' className='underline font-medium'>
                            Shop now
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-around w-full'>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon-delivery.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>FREE AND FAST DELIVERY</p>
                        <p className='text-[14px]'>Free delivery for all order over $140</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon_customer_service.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>24/7 CUSTOMER SERVICE</p>
                        <p className='text-[14px]'>Friendly 24/7 customer support</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon_secure.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>MONEY BACK GUARANTEE</p>
                        <p className='text-[14px]'>We return money within 30 days</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Feature
