'use client'

import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useAppContext } from '@/context/AppContext'
import UserDropdownMenu from './UserDropdownMenu'
import { NAV_LINKS } from '@/utils/constants'
import { usePathname } from 'next/navigation'

const Header = () => {
    const { user, cartCount, wishListCount } = useAppContext()
    const pathname = usePathname()

    return (
        <div className='flex w-full justify-between items-center h-[96px] fixed top-0 left-0 z-50 bg-white border-b px-[135px]'>
            <div>
                <h1 className='font-bold text-[24px] cursor-pointer'>
                    <Link href={'/'}>Neo Store</Link>
                </h1>
            </div>
            <nav className='flex gap-20'>
                {NAV_LINKS.map(link => (
                    <Link href={link.path} key={link.path}>
                        <p
                            className={`${
                                link.path === pathname
                                    ? "after:content-[''] after:absolute after:h-[1px] after:w-full after:bg-slate-400 after:bottom-[-1px] after:mx-0 after:my-auto after:left-0 after:right-0"
                                    : ''
                            } text-[16px] relative`}
                        >
                            {link.name}
                        </p>
                    </Link>
                ))}
            </nav>
            <div className='flex items-center gap-[24px]'>
                <div className='relative w-[243px]'>
                    <Input
                        className='text-[12px] opacity-[0.5] pl-[20px] pr-[25px] py-[7px] bg-secondary'
                        type='text'
                        placeholder='What are you looking for?'
                    />
                    <div className='absolute top-[10px] right-3'>
                        <Search size={'16px'} className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex gap-[16px]'>
                    <Link href={'/wishlist'}>
                        <div className='relative'>
                            <Heart className='cursor-pointer' />
                            {wishListCount > 0 && (
                                <span className='absolute top-[-5px] right-[-6px] h-4 w-4 rounded-full bg-secondary2 text-white text-[12px] flex items-center justify-center'>
                                    {wishListCount}
                                </span>
                            )}
                        </div>
                    </Link>
                    <Link href={'/cart'}>
                        <div className='relative'>
                            <ShoppingCart className='cursor-pointer' />
                            {cartCount > 0 && ( 
                                <span className='absolute top-[-5px] right-[-6px] h-4 w-4 rounded-full bg-secondary2 text-white text-[12px] flex items-center justify-center'>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                    <UserDropdownMenu user={user} />
                </div>
            </div>
        </div>
    )
}

export default Header
