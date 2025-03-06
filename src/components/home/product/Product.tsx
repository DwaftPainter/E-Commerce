'use client'

import { Eye, Heart, Minus, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import StarRating from './StarRating'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext'
import { ProductType } from '@/types/product.type'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useRedirect } from '@/hooks/use-redirect'

interface ProductProps {
    product: ProductType
    className?: string
    height?: string
    isWishlist?: boolean
}

const Product = ({ product, isWishlist, className }: ProductProps) => {
    const { addToCart, deleteFromCart, removeFromCart, addToWishList, wishItems, cartItems, user } =
        useAppContext()
    const [quantity, setQuantity] = React.useState(1)
    const router = useRouter()

    React.useEffect(() => {
        const item = cartItems?.find(items => items?.product?._id === product?._id)
        if (item) {
            setQuantity(item.quantity)
        }
    }, [cartItems, product?._id])

    const handleAddToCartClick = (product: ProductType) => {
        addToCart(product)
    }
    const handleAddToWishListClick = (product: ProductType, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addToWishList(product)
    }

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
        addToCart(product)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
            deleteFromCart(product?._id)
        } else {
            removeFromCart(product?._id)
        }
    }

    return (
        <div className={cn('sm:max-w-full flex flex-col gap-4 ', className)}>
            <div className='relative rounded-sm group cursor-pointer'>
                <img src={product.image} alt='' className={cn('w-full aspect-square rounded-sm')} />
                {product.discount !== 0 && (
                    <span className='px-[12px] py-[6px] bg-secondary2 text-text text-[12px] rounded-sm absolute top-[12px] left-[12px]'>
                        -{product?.discount}%
                    </span>
                )}
                <div className='flex flex-col gap-[8px] absolute top-[12px] right-[12px] z-10'>
                    {isWishlist ? (
                        <button
                            className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'
                            onClick={e => {
                                if (useRedirect(user, '/auth/sign-in', router)) handleAddToWishListClick(product, e)
                            }}
                        >
                            <Trash2 size={20} />
                        </button>
                    ) : (
                        <>
                            <button
                                className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'
                                onClick={e => {
                                    if (useRedirect(user, '/auth/sign-in', router)) handleAddToWishListClick(product, e)
                                }}
                            >
                                <motion.div
                                    animate={{
                                        scale: wishItems.find(item => item._id === product._id)
                                            ? [1, 1.2, 1]
                                            : 1,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Heart
                                        size={20}
                                        className={`${
                                            wishItems.find(item => item._id === product._id)
                                                ? 'fill-red-500 stroke-red-500'
                                                : 'stroke-black'
                                        } transition-colors duration-300`}
                                    />
                                </motion.div>
                            </button>
                            <Link href={`product/${product.slug}`}>
                                <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                                    <Eye size={20} />
                                </span>
                            </Link>
                        </>
                    )}
                </div>
                {cartItems?.find(items => items?.product?._id === product?._id) ? (
                    <div className='grid grid-cols-4 bg-white w-full absolute bottom-0 rounded-b-[4px]'>
                        <button
                            onClick={decreaseQuantity}
                            className='col-[1/2] py-[10px] px-[5px] flex justify-center items-center rounded-bl-sm text-white bg-black'
                        >
                            <Minus size={16} />
                        </button>
                        <span className='h-10 border-t border-b col-[2/4] flex items-center justify-center font-medium'>
                            {quantity}
                        </span>
                        <button
                            onClick={increaseQuantity}
                            className='col-[4/5] py-[10px] px-[5px] flex justify-center items-center rounded-br-sm bg-button2 hover:bg-hover2'
                        >
                            <Plus color='white' size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`bg-black text-text text-center w-full font-medium py-[8.5px] absolute bottom-0 rounded-bl-[4px] rounded-br-[4px] cursor-pointer ${
                            isWishlist ? 'visible' : 'sm:invisible group-hover:visible'
                        } `}
                        onClick={() => {
                            if (useRedirect(user, '/auth/sign-in', router)) handleAddToCartClick(product)
                        }}
                    >
                        Add To Cart
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-[8px]'>
                <p className='font-medium truncate'>{product?.name}</p>
                <div className='flex gap-[12px] font-medium'>
                    <p className='text-secondary2'>
                        ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                    </p>
                    {product.discount !== 0 && (
                        <p className='text-black opacity-50 line-through'>${product.price}</p>
                    )}
                </div>
                {isWishlist ? (
                    <></>
                ) : (
                    <StarRating
                        totalStars={5}
                        initialRating={product?.rating || 0}
                        readOnly={true}
                        review={product?.review || 0}
                    />
                )}
            </div>
        </div>
    )
}

export default Product

export const ListProduct = ({ product }: ProductProps) => {
    const { addToCart, cartItems, addToWishList, deleteFromCart, getCartItem, wishItems } = useAppContext()

    const handleAddToCartClick = (product: ProductType) => {
        addToCart(product)
    }
    const handleAddToWishListClick = (product: ProductType, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addToWishList(product)
    }

    return (
        <div className=' flex gap-[16px]'>
            <div className='relative rounded-sm group cursor-pointer'>
                <img src={product.image} alt='' className='w-[200px] h-[200px] rounded-sm' />
                {product.discount !== 0 && (
                    <span className='px-[12px] py-[6px] bg-secondary2 text-text text-[12px] rounded-sm absolute top-[12px] left-[12px]'>
                        -{product?.discount}%
                    </span>
                )}
                <div className='flex flex-col gap-[8px] absolute top-[12px] right-[12px] z-10'>
                    <Link href={`product/${product.slug}`}>
                        <span className='w-[34px] h-[34px] rounded-full bg-primary flex items-center justify-center cursor-pointer'>
                            <Eye size={20} />
                        </span>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='font-medium truncate'>{product?.name}</p>
                    <div className='flex gap-[12px] font-medium'>
                        <p className='text-secondary2'>
                            ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                        </p>
                        {product.discount !== 0 && (
                            <p className='text-black opacity-50 line-through'>${product.price}</p>
                        )}
                    </div>

                    <StarRating
                        totalStars={5}
                        initialRating={product?.rating || 0}
                        readOnly={true}
                        review={product?.review || 0}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div
                        className={`w-40 border text-center text-sm font-medium py-[8.5px] rounded-sm cursor-pointer flex justify-center items-center gap-2 ${
                            wishItems.find(item => item._id === product._id)
                                ? 'text-secondary2'
                                : 'text-black'
                        }`}
                        onClick={e => {
                            handleAddToWishListClick(product, e)
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: wishItems.find(item => item._id === product._id) ? [1, 1.2, 1] : 1,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Heart
                                size={20}
                                className={`${
                                    wishItems.find(item => item._id === product._id)
                                        ? 'fill-red-500 stroke-red-500'
                                        : 'stroke-black'
                                } transition-colors duration-300`}
                            />
                        </motion.div>
                        Add To WishList
                    </div>
                    {getCartItem(product._id)?.quantity! > 0 ? (
                        <div className='grid grid-cols-4 max-w-40'>
                            <button
                                onClick={() => {
                                    deleteFromCart(product._id)
                                }}
                                className='col-[1/2] py-[8.5px] px-[5px] flex justify-center items-center rounded-tl-sm rounded-bl-sm border'
                            >
                                <Minus size={16} />
                            </button>
                            <span className='w-20 h-10 border-t border-b col-[2/4] flex items-center justify-center font-medium text-sm'>
                                {cartItems.find(item => item.product._id === product._id)?.quantity}
                            </span>
                            <button
                                onClick={() => {
                                    addToCart(product)
                                }}
                                className='col-[4/5] py-[8.5px] px-[5px] flex justify-center items-center rounded-tr-sm rounded-br-sm bg-button2 hover:bg-hover2'
                            >
                                <Plus color='white' size={16} />
                            </button>
                        </div>
                    ) : (
                        <div
                            className='bg-black text-text text-center text-sm font-medium py-[10px]  rounded-sm cursor-pointer'
                            onClick={() => {
                                handleAddToCartClick(product)
                            }}
                        >
                            Add To Cart
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
