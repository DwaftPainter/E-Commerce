'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Error = () => {
    return (
        <div className='w-full h-[50vh] flex flex-col justify-end items-center gap-[80px]'>
            <div className='w-full flex flex-col justify-center items-center gap-[40px]'>
                <h1 className='text-[110px] font-medium leading-none'>404 Not Found</h1>
                <p>Your visited page not found. You may go home page.</p>
            </div>
            <Button className='bg-secondary2 hover:bg-hover2 rounded-[4px] h-[56px] px-[48px] py-[16px] font-medium'>
              <Link href='/'>
                Back to home page
              </Link>
            </Button>
        </div>
    )
}

export default Error