import Footer from '@/components/footer'
import React from 'react'

const MainLayout = ({ children } : {children: React.ReactNode}) => {
  return (
    <>
        <div className="w-full">
            {children}
        </div>
        <Footer/>
    </>
  )
}

export default MainLayout