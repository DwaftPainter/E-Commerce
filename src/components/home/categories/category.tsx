'use client'

import Link from 'next/link'
import React from 'react'

interface categoryProps {
    name: string
    icon: React.ReactNode
}

const Category = ({ name, icon }: categoryProps) => {
    return (
        <Link href={`categories/${name}`}>
            <div className='flex flex-col gap-[20px] items-center justify-center rounded-[4px] w-[170px] h-[135px] border-[1px] border-black  hover:border-secondary2 border-opacity-30 cursor-pointer hover:bg-secondary2 hover:text-text'>
                {icon}
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default Category
