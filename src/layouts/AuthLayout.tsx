'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
    children?: React.ReactNode
    className?: string
}

const AuthLayout = ({ children, className }: Props) => {
    return (
        <div className={cn('mt-20 flex gap-[130px]', className)}>
            <img
                className='2xl:-ml-[200px] xl:-ml-16 md:-ml-10 -ml-4 w-[70%] max-h-[800px] lg:block hidden'
                src='/assets/images/side-image.png'
                alt=''
            />
            {children}
        </div>
    )
}

export default AuthLayout
