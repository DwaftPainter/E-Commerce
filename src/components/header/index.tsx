'use client'

import React from 'react'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useAppContext } from '@/context/AppContext'
import UserDropdownMenu from './UserDropdownMenu'
import { NAV_LINKS } from '@/utils/constants'
import { usePathname, useRouter } from 'next/navigation'
import MobileMenu from './mobileMenu'
import { cn } from '@/lib/utils'
import { ProductType } from '@/types/product.type'
import SearchResultBox from '../navigation/mobile-nav/searchResultBox'
import HeaderEvent from '../home/event'
import { useRedirect } from '@/hooks/use-redirect'

const Header = () => {
    const [input, setInput] = React.useState('')
    const [products, setProducts] = React.useState<ProductType[]>([])
    const { user, cartCount, wishListCount } = useAppContext()
    const [focus, setFocus] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    React.useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            console.log('fetch')
            async function searchProducts() {
                const res = await fetch('/api/product')
                const { data } = await res.json()
                const filteredData = data?.filter((product: ProductType) =>
                    product.name
                        .toLowerCase()
                        .trim()
                        .replace(/\s/g, '')
                        .includes(input.toLowerCase().trim().replace(/\s/g, ''))
                )
                setProducts(filteredData)
            }
            searchProducts()
        }, 1000)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [input])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    return (
        <>
            <HeaderEvent />
            <div className='flex w-full sm:h-[96px] h-14 justify-between items-center fixed top-0 left-0 z-50 bg-white border-b 2xl:px-[200px] xl:px-16 md:px-10 px-4 mt-12'>
                <MobileMenu />
                <h1 className='font-bold text-[24px] cursor-pointer'>
                    <Link href={'/'}>
                        <span className='text-secondary2'>Neo</span> Store
                    </Link>
                </h1>
                <nav className='lg:flex hidden lg:gap-20 md:gap-12 '>
                    {NAV_LINKS.map(link => (
                        <Link
                            onClick={(e) => {
                                if (link.path === '/contact' && !useRedirect(user, '/auth/sign-in', router)) {
                                    e.preventDefault()
                                    router.push('/auth/sign-in')
                                    return
                                }
                            }}
                            href={link.path}
                            key={link.path}
                            className='cursor-pointer'
                        >
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
                    <div className='relative w-[260px] sm:block hidden'>
                        <Input
                            className='text-[12px] opacity-[0.5] pl-[20px] pr-[25px] py-[7px] bg-secondary rounded-sm'
                            type='text'
                            placeholder='What are you looking for?'
                            onChange={handleChange}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={input}
                        />
                        <div className='absolute top-[10px] right-3'>
                            <Search size={'16px'} className='cursor-pointer' />
                        </div>
                        {focus && (
                            <SearchResultBox
                                products={products}
                                setFocus={setFocus}
                                className='absolute bg-white w-[388px]'
                            ></SearchResultBox>
                        )}
                    </div>
                    <div className='flex gap-[16px]'>
                        <Link
                            href={'/wishlist'}
                            className='sm:block hidden'
                            onClick={() => {
                                useRedirect(user, '/auth/sign-in', router)
                            }}
                        >
                            <div className='relative'>
                                <Heart className='cursor-pointer' />
                                {wishListCount > 0 && (
                                    <span
                                        className={cn(
                                            'absolute top-[-5px] right-[-6px] h-4 w-4 rounded-full bg-secondary2 text-white text-[12px] flex items-center justify-center',
                                            wishListCount > 9 && 'text-[10px]'
                                        )}
                                    >
                                        {wishListCount > 9 ? '9+' : wishListCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <Link
                            href={'/cart'}
                            onClick={() => {
                                useRedirect(user, '/auth/sign-in', router)
                            }}
                        >
                            <div className='relative'>
                                <ShoppingCart className='cursor-pointer' />
                                {cartCount > 0 && (
                                    <span
                                        className={cn(
                                            'absolute top-[-5px] right-[-6px] h-4 w-4 rounded-full bg-secondary2 text-white text-[12px] flex items-center justify-center',
                                            cartCount > 9 && 'text-[10px]'
                                        )}
                                    >
                                        {cartCount > 9 ? '9+' : cartCount}
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
        </>
    )
}

export default Header
