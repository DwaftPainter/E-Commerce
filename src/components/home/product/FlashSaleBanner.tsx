import { Button } from '@/components/ui/button'
import React from 'react'
import SaleClock from './SaleClock'

const FlashSaleBanner = () => {
    const product = {
        "_id": "65c12345abcde67890123456",
        "product": "65b98765fghij43210987654",
        "discountPrice": 499000,
        "startTime": new Date("2025-02-10T08:00:00.000Z"),
        "endTime": new Date("2025-02-11T12:00:00.000Z"),
        "stock": 50,
        "isActive": true,
        "title": "Enhance Your Music Experience"
      }

    return (
        <div className='h-[600px] w-full border bg-[url(/assets/images/banner4.png)] bg-cover flex items-center'>
            <div className='flex flex-col gap-10 w-[35%] px-14 py-[75px]'>
                <h1 className='font-semibold text-[48px] text-white'>{product.title}</h1>
                <SaleClock startDate={product.startTime} endDate={product.endTime}/>
                <Button className='bg-button1 hover:bg-hover1 w-fit h-fit py-4 px-12' onClick={() => {}}>Buy Now!</Button>
            </div>
        </div>
    )
}

export default FlashSaleBanner
