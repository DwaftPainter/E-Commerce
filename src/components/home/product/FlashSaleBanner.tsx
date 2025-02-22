import { Button } from '@/components/ui/button'
import React from 'react'
import SaleClock from './SaleClock'

const FlashSaleBanner = () => {
    const product = {
        "_id": "65c12345abcde67890123456",
        "product": "65b98765fghij43210987654",
        "discountPrice": 499000,
        "startTime": new Date("2025-02-10T08:00:00.000Z"),
        "endTime": new Date("2025-03-11T12:00:00.000Z"),
        "stock": 50,
        "isActive": true,
        "title": "Enhance Your Music Experience"
      }

    return (
        <div className='sm:h-[600px] w-full border bg-[url(/assets/images/banner4.png)] bg-cover bg-center flex items-center rounded-sm'>
            <div className='flex flex-col sm:gap-10 gap-6 lg:w-[35%] md:w-[75%] sm:w-full w-[50%] sm:px-14 p-6 lg:py-[75px] py-7'>
                <h1 className='font-semibold sm:text-[48px] sm:leading-none text-2xl text-white'>{product.title}</h1>
                <SaleClock startDate={product.startTime} endDate={product.endTime}/>
                <Button className='bg-button1 hover:bg-hover1 w-fit h-fit sm:py-4 py-2 sm:px-12 px-4' onClick={() => {}}>Buy Now!</Button>
            </div>
        </div>
    )
}

export default FlashSaleBanner
