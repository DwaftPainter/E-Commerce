import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-[60px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-[20px]'>Wishlist (4)</h1>
                    <Button className='bg-transparent hover:bg-button2 rounded-[4px] h-[56px] px-[48px] py-[16px] text-black hover:text-white font-medium border-black border-opacity-50 border-[1px] hover:border-secondary2'>
                        Move All To Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page
