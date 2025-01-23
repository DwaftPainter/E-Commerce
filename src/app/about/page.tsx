import React from 'react'
import { Icon } from '@iconify/react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import { leaders } from '@/mock_data'
import Link from 'next/link'

const About = () => {
    return (
        <div className='min-h-[400px] flex flex-col lg:gap-[135px] px-[135px]'>
            <div className='w-full flex items-center justify-center gap-[80px]'>
                <div className=' flex flex-col gap-[40px]'>
                    <h1 className='font-semibold text-[54px]'>Our Story</h1>
                    <p className='leading-[26px]'>
                        Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an
                        active presense in Bangladesh. Supported by wide range of tailored marketing, data and
                        service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
                        customers across the region.{' '}
                    </p>
                    <p className='leading-[26px]'>
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive
                        offers a diverse assotment in categories ranging from consumer.
                    </p>
                </div>
                <img
                    src='assets/images/portal.png'
                    alt=''
                    className='max-h-[600px] max-w-[800px] rounded-tl-[4px] rounded-bl-[4px] -mr-[135px]'
                />
            </div>
            <div className='flex justify-between items-center'>
                <div className='border-[1px] border-opacity-30 rounded-[4px] w-[270px] h-[230px] flex flex-col justify-center items-center gap-[24px] cursor-pointer group hover:bg-secondary2 hover:text-text hover:shadow'>
                    <div
                        className='flex justify-center items-center h-[80px] w-[80px] bg-black group-hover:bg-white border-[11px] 
                     border-opacity-30 rounded-full'
                    >
                        <Icon
                            icon='hugeicons:house-02'
                            width='40'
                            height='40'
                            className='text-white group-hover:text-black'
                        />
                    </div>
                    <div className='flex flex-col gap-[12px] items-center'>
                        <p className='font-bold text-[32px] leading-none'>45.5k</p>
                        <p>Sallers active our site</p>
                    </div>
                </div>
                <div className='border-[1px] border-opacity-30 rounded-[4px] w-[270px] h-[230px] flex flex-col justify-center items-center gap-[24px] cursor-pointer group hover:bg-secondary2 hover:text-text hover:shadow'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black group-hover:bg-white border-[11px] rounded-full '>
                        <Icon
                            icon='hugeicons:money-send-circle'
                            width='40'
                            height='40'
                            className='text-white group-hover:text-black'
                        />
                    </div>
                    <div className='flex flex-col gap-[12px] items-center'>
                        <p className='font-bold text-[32px] leading-none'>45.5k</p>
                        <p>Monthly Product Sale</p>
                    </div>
                </div>
                <div className='border-[1px] border-opacity-30 rounded-[4px] w-[270px] h-[230px] flex flex-col justify-center items-center gap-[24px] cursor-pointer group hover:bg-secondary2 hover:text-text hover:shadow'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black group-hover:bg-white border-[11px] rounded-full '>
                        <Icon
                            icon='hugeicons:shopping-bag-01'
                            width='40'
                            height='40'
                            className='text-white group-hover:text-black'
                        />
                    </div>
                    <div className='flex flex-col gap-[12px] items-center'>
                        <p className='font-bold text-[32px] leading-none'>45.5k</p>
                        <p>Customer active in our site</p>
                    </div>
                </div>
                <div className='border-[1px] border-opacity-30 rounded-[4px] w-[270px] h-[230px] flex flex-col justify-center items-center gap-[24px] cursor-pointer group hover:bg-secondary2 hover:text-text hover:shadow'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black group-hover:bg-white border-[11px] rounded-full '>
                        <Icon
                            icon='hugeicons:money-bag-02'
                            width='40'
                            height='40'
                            className='text-white group-hover:text-black'
                        />
                    </div>
                    <div className='flex flex-col gap-[12px] items-center'>
                        <p className='font-bold text-[32px] leading-none'>45.5k</p>
                        <p>Anual gross sale in our site</p>
                    </div>
                </div>
            </div>
            <Carousel
                opts={{
                    align: 'center'
                }}
                className='w-full'
            >
                <CarouselContent className='flex w-full gap-[5%] -ml-0'>
                    {leaders.map((leader, index) => (
                        <CarouselItem
                            className='basis-[30%] p-0 flex items-center justify-center'
                            key={index}
                        >
                            <div className='flex flex-col gap-[32px] w-full'>
                                <img
                                    className='w-full max-h-[500px] h-auto rounded-[4px] object-cover'
                                    src={leader.image}
                                />
                                <div className='flex flex-col gap-[16px]'>
                                    <h1 className='font-medium text-[32px]'>{leader.name}</h1>
                                    <p>{leader.position}</p>
                                    <div className='flex gap-[16px]'>
                                        <Link href={leader.socials.twitter}>
                                            <Twitter size={24} />
                                        </Link>
                                        <Link href={leader.socials.instagram}>
                                            <Instagram size={24} />
                                        </Link>
                                        <Link href={leader.socials.linkedin}>
                                            <Linkedin size={24} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
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
                        <img className='h-[40px]' src='assets/icons/icon-customer-service.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>24/7 CUSTOMER SERVICE</p>
                        <p className='text-[14px]'>Friendly 24/7 customer support</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[25px] justify-center items-center'>
                    <div className='flex justify-center items-center h-[80px] w-[80px] bg-black border-[11px] rounded-full '>
                        <img className='h-[40px]' src='assets/icons/icon-secure.png' alt='' />
                    </div>
                    <div className='flex flex-col gap-[20px] items-center'>
                        <p className='font-semibold text-[20px]'>MONEY BACK GUARANTEE</p>
                        <p className='text-[14px]'>We return money within 30 days</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
