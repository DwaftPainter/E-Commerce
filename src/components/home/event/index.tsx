import Link from 'next/link'
import React from 'react'

const HeaderEvent = () => {
    return (
        <div className='h-12 w-full flex items-center justify-center text-center bg-black fixed top-0 left-0 z-50 px-4'>
            <p className='text-sm text-white'>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
                <Link href={'/shop'} className='underline font-semibold'>
                    Shop now
                </Link>
            </p>
        </div>
    )
}

export default HeaderEvent
