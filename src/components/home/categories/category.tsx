'use client'

import { categories } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'

interface categoryProps {
    name: string
    icon: React.ReactNode
}

const Category = ({ name, icon }: categoryProps) => {
    return (
        <Link href={`shop?filter_cat=${categories.find(category => category.name === name)?.id}`}>
            <div className='flex flex-col gap-5 items-center justify-center text-center rounded-sm lg:max-w-[170px] h-[135px] border-[1px] border-black sm:hover:border-secondary2 active:border-secondary2 border-opacity-30 cursor-pointer sm:hover:bg-secondary2 active:bg-secondary2 sm:hover:text-text active:text-text'>
                {icon}
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default Category
