

import React from 'react'
import Layout from './layout'

interface Props {
    children?: React.ReactNode,
    title: string
}

const HomeLayout = ({ children, title } : Props) => {
  return (
    <Layout>
        <div className='mb-[35px] flex items-center gap-[16px] h-[40px]'>
            <div className="h-[40px] w-[20px] rounded-[4px] bg-secondary2 text-secondary2 z-10"></div>
            <p className='text-[#db4444] font-semibold' >{title}</p>
        </div>
        <div>
            {children}
        </div>
    </Layout>
  )
}

export default HomeLayout