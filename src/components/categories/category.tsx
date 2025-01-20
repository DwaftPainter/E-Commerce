'use client'

import React from 'react'

interface categoryProps{
    name: string
    icon: React.ReactNode
}

const Category = ({ name, icon } : categoryProps) => {
  return (
    <div className='flex flex-col gap-[20px] items-center justify-center rounded-[4px] w-[170px] h-[135px] border-[1px] border-black border-opacity-30'>
        {icon}
        <p>{name}</p>
    </div>
  )
}

export default Category