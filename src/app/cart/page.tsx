'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAppContext } from '@/context/AppContext'
import { ChevronDown, ChevronUp, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent } from 'react'

const page = () => {
    const { cartItems, updateToCart, removeFromCart } = useAppContext()
    const route = useRouter()
    const handleQuantityChange = (productId: string, qty: number) => {
        const quantity = Number(qty)
        if (quantity >= 1) {
            updateToCart(productId, quantity)
        }
    }

    const handleOnChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
        const qty = e.target.value
        if (qty === '') {
            updateToCart(productId, 0)
            return
        }

        const quantity = Number(qty)
        if (quantity >= 1) {
            updateToCart(productId, quantity)
        }
    }

    return (
        <div className='flex flex-col gap-[90px]'>
            <div className='flex flex-col gap-[30px]'>
                <div className='grid grid-cols-[1fr_1fr_1fr_auto] items-center rounded-sm shadow-custom p-[30px]'>
                    <p>Product</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                {cartItems?.length === 0 ? (
                    <div className='w-full flex justify-center items-center gap-3 my-8'>
                        <ShoppingCart size={28} />
                        <p className='font-semibold text-xl'>Your cart is empty</p>
                    </div>
                ) : (
                    cartItems?.map((item, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-[1fr_1fr_1fr_auto] items-center rounded-sm shadow-custom p-[30px]'
                        >
                            <div className='flex items-center gap-3 relative'>
                                <img src={item?.product?.image} alt='' className='h-[54px] w-[54px]' />
                                <p>{item?.product?.name}</p>
                                <span
                                    className='absolute top-[-8px] left-[-8px] bg-secondary2 hover:bg-hover2 rounded-full h-[18px] w-[18px] flex items-center justify-center cursor-pointer'
                                    onClick={() => removeFromCart(item.product._id)}
                                >
                                    <X size={12} color='white' />
                                </span>
                            </div>
                            <p>${item?.product?.price}</p>
                            <div className='relative max-w-[70px]'>
                                <Input
                                    type='number'
                                    value={item.quantity}
                                    min={1}
                                    className='max-w-[70px] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none appearance-none pr-6'
                                    onChange={e => handleOnChange(item.product._id, e)}
                                    onBlur={e =>
                                        handleQuantityChange(item.product._id, parseInt(e.target.value))
                                    }
                                />
                                <div className='flex flex-col absolute top-[2px] left-12 z-50'>
                                    <ChevronUp
                                        size={16}
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleQuantityChange(item.product._id, item.quantity + 1)
                                        }
                                    />
                                    <ChevronDown
                                        size={16}
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleQuantityChange(item.product._id, item.quantity - 1)
                                        }
                                    />
                                </div>
                            </div>
                            <div className='w-[62px] text-center'>
                                ${(item?.product?.price * item?.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
                <div className='flex w-full justify-between items-center'>
                    <Button className='bg-transparent hover:bg-button2 rounded-[4px] h-[56px] px-[48px] py-[16px] text-black hover:text-white font-medium border-black border-opacity-50 border-[1px] hover:border-secondary2'>
                        Return To Shop
                    </Button>
                    <Button
                        className='bg-transparent hover:bg-button2 rounded-[4px] h-[56px] px-[48px] py-[16px] text-black hover:text-white font-medium border-black border-opacity-50 border-[1px] hover:border-secondary2'
                        onClick={() => route.refresh()}
                    >
                        Update Cart
                    </Button>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-5'>
                    <Input
                        placeholder='Coupon Code'
                        className='rounded-sm border-black outline-none focus-visible:ring-0 h-fit px-5 py-4 w-[300px]'
                    />
                    <Button className='bg-secondary2 hover:bg-hover2 border border-secondary2 hover:border-hover2 rounded-sm px-12 py-4 font-medium h-fit'>
                        Apply Coupon
                    </Button>
                </div>
                <div className='flex flex-col gap-7 items-start rounded-sm px-5 py-[30px] border border-black w-[470px]'>
                    <h1 className='font-medium text-xl'>Cart Total</h1>
                    <div className='flex flex-col gap-5 w-full justify-center'>
                        <div className='flex justify-between'>
                            <p>Subtotal: </p>
                            <p>$100</p>
                        </div>
                        <Separator />
                        <div className='flex justify-between'>
                            <p>Shipping: </p>
                            <p>Free</p>
                        </div>
                        <Separator />
                        <div className='flex justify-between'>
                            <p>Total</p>
                            <p>$100</p>
                        </div>
                    </div>
                    <Button className='bg-secondary2 hover:bg-hover2 border border-secondary2 hover:border-hover2 rounded-sm px-12 py-4 font-medium h-fit'>
                        Process to checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page
