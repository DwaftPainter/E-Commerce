'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppContext } from '@/context/AppContext'
import { Heart, Home, Search, Store, User } from 'lucide-react'

const MobileNav = () => {
    const { user, wishListCount } = useAppContext()
    const paths = usePathname().split('/').filter(Boolean)
    console.log("🚀 ~ MobileNav ~ paths:", paths)

    return (
        <div className='w-full h-14 fixed bottom-0 left-0 border sm:hidden flex justify-between items-center bg-white px-4 py-2 z-50'>
            <Link href={paths?.length >= 0 && paths[0] !== 'shop' ? '/shop' :  '/'} className='flex flex-col items-center justify-center'>
                {paths?.length >= 0 && paths[0] !== 'shop' ? <Store size={20} /> :  <Home size={20} />}
                <p className='text-[10px]'>{paths?.length >= 0 && paths[0] !== 'shop' ? 'Store' : 'Home'}</p>
            </Link>
            <Link href='/' className='flex flex-col items-center justify-center'>
                <Search size={20} />
                <p className='text-[10px]'>Search</p>
            </Link>
            <Link href='/wishlist' className='flex flex-col items-center justify-center'>
                <div className='relative'>
                    <Heart className='cursor-pointer' />
                    {wishListCount > 0 && (
                        <span className='absolute top-[-5px] right-[-6px] h-4 w-4 rounded-full bg-secondary2 text-white text-[12px] flex items-center justify-center'>
                            {wishListCount}
                        </span>
                    )}
                </div>
                <p className='text-[10px]'>Wishist</p>
            </Link>
            <Link
                href={user ? '/my-account' : '/auth/sign-up'}
                className='flex flex-col items-center justify-center'
            >
                <User size={20} />
                <p className='text-[10px]'>Account</p>
            </Link>
        </div>
    )
}

export default MobileNav
