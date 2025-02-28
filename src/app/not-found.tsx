'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Error = () => {
    return (
        <div className='w-full sm:h-[50vh] h-[30vh] flex flex-col justify-end items-center gap-[40px] md:gap-[80px] px-4 text-center'>
            <div className='w-full flex flex-col justify-center items-center gap-[20px] md:gap-[40px]'>
                <h1 className='text-4xl sm:text-6xl md:text-[110px] font-medium leading-none'>
                    404 Not Found
                </h1>
                <p className="text-sm sm:text-base md:text-lg">
                    Your visited page not found. You may go to the home page.
                </p>
            </div>
            <Link href='/'>
                <Button className='bg-secondary2 hover:bg-hover2 rounded-sm  h-[48px] sm:h-[56px] px-[32px] sm:px-[48px] py-[12px] sm:py-[16px] font-medium'>
                    Back to home page
                </Button>
            </Link>
        </div>
    )
}

export default Error
