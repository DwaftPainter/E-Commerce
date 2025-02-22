'use client'

import React from 'react'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useAppContext } from '@/context/AppContext'
import UserDropdownMenu from './UserDropdownMenu'
import { NAV_LINKS } from '@/utils/constants'
import { usePathname } from 'next/navigation'
import MobileMenu from './mobileMenu'

const Header = () => {
    const { user, cartCount, wishListCount } = useAppContext()
    const pathname = usePathname()

    return (
        <div className='flex w-full sm:h-[96px] h-14 justify-between items-center fixed top-0 left-0 z-50 bg-white border-b 2xl:px-[200px] xl:px-16 md:px-10 px-4'>
            <div className='flex items-center lg:w-fit w-full md:gap-4 gap-[30%]'>
                <MobileMenu />
                <h1 className='font-bold text-[24px] cursor-pointer'>
                    <Link href={'/'}>Neo Store</Link>
                </h1>
            </div>
            <nav className='lg:flex hidden lg:gap-20 md:gap-12 '>
                {NAV_LINKS.map(link => (
                    <Link href={link.path} key={link.path} className='cursor-pointer'>
                        <div
                            className={`${
                                link.path === pathname
                                    ? "after:content-[''] after:absolute after:h-[1px] after:w-full after:bg-slate-400 after:bottom-[-1px] after:mx-0 after:my-auto after:left-0 after:right-0"
                                    : ''
                            } text-[16px] relative cursor-pointer`}
                        >
                            {link.name}
                        </div>
                    </Link>
                ))}
            </nav>
            <div className='flex items-center gap-[24px]'>
                <div className='relative w-[243px] sm:block hidden'>
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
                    <button className='sm:block hidden'>
                        <UserDropdownMenu user={user} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
