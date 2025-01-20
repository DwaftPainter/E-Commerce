'use client'

import React from 'react'

const Layout = ({ children } : {children: React.ReactNode}) => {
  return (
    <div className='w-full px-[135px]'>
        {children}
    </div>
  )
}

export default Layout