'use client'

import React from 'react'
import Layout from './layout'

interface Props {
    children?: React.ReactNode,
    title: string,
    className?: string
}

const HomeLayout = ({ children, title, className } : Props) => {
  return (
    <Layout>
        <div className='flex items-center gap-[16px] h-[40px]'>
            <div className="h-[40px] w-[20px] rounded-[4px] bg-secondary2 text-secondary2 z-10"></div>
            <p className='text-[#db4444] font-semibold' >{title}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </Layout>
  )
}

export default HomeLayout