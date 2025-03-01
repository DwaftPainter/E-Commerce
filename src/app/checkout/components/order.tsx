'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAppContext } from '@/context/AppContext'
import { useOrderContext } from '@/context/OrderContext'

interface Props {
    payMethod: 'cash' | 'bank'
    setPayMethod: React.Dispatch<React.SetStateAction<'cash' | 'bank'>>
}

const Order = ({ payMethod, setPayMethod }: Props) => {
    const { cartItems, cartTotal } = useAppContext()
    const { setItems } = useOrderContext()

    React.useEffect(() => {
        setItems(cartItems)
    }, [])

    return (
        <div className='border-[2px] border-secondary2 rounded-sm px-6 py-8 lg:min-w-[400px] h-fit'>
            <h1 className='font-semibold'>YOUR ORDER</h1>
            <Separator className='my-2' />
            <div className='flex justify-between text-sm font-semibold opacity-50'>
                <p>Product</p>
                <p>Price</p>
            </div>
            <Separator className='my-4' />
            <div className='flex flex-col gap-6'>
                {cartItems?.map((item, index) => (
                    <div className='flex justify-between text-sm' key={index}>
                        <span>
                            {item?.product?.name} <p className='font-semibold'>x{item?.quantity}</p>
                        </span>
                        <p>${item?.product?.price * item?.quantity}</p>
                    </div>
                ))}
            </div>

            <Separator className='my-4' />
            <div className='flex justify-between text-sm font-semibold'>
                <p className='opacity-70'>Subtotal</p>
                <p>${cartTotal}</p>
            </div>
            <Separator className='my-4' />

            <div className='flex justify-between text-sm font-semibold'>
                <p className='opacity-70'>Shipping</p>
                <p>$5</p>
            </div>
            <Separator className='my-4' />
            <div className='flex justify-between text-sm font-semibold'>
                <p className='opacity-70'>Total</p>
                <p>${cartTotal + 5}</p>
            </div>
            <Separator className='my-4' />
            <ToggleGroup
                type='single'
                className='flex flex-col items-start gap-4'
                value={payMethod}
                onValueChange={(value: 'cash' | 'bank') => setPayMethod(value)}
            >
                <div className='flex items-center justify-center gap-6'>
                    <div
                        className={`rounded-full border-2 flex items-center justify-center p-0.5 ${
                            payMethod === 'bank' ? 'border-gray-900' : 'border-gray-300'
                        }`}
                    >
                        <ToggleGroupItem
                            value='bank'
                            id='bank'
                            className={`h-2 w-2 rounded-full p-0 min-w-0 data-[state=on]:bg-secondary2`}
                        />
                    </div>
                    <Label htmlFor='bank' className='text-secondary2 font-semibold'>
                        Direct bank transfer
                    </Label>
                </div>
                <div className='flex items-center justify-center gap-6'>
                    <div
                        className={`rounded-full border-2 flex items-center justify-center p-0.5 ${
                            payMethod === 'cash' ? 'border-gray-900' : 'border-gray-300'
                        }`}
                    >
                        <ToggleGroupItem
                            value='cash'
                            id='cash'
                            className={`h-2 w-2 rounded-full p-0 min-w-0 data-[state=on]:bg-secondary2`}
                        />
                    </div>
                    <Label htmlFor='cash' className='text-secondary2 font-semibold'>
                        Cash on delivery
                    </Label>
                </div>
            </ToggleGroup>
            <Button
                type='submit'
                className='w-full rounded-sm hover:bg-hover2 bg-secondary2 h-fit py-4 mt-6'
                disabled={cartItems?.length <= 0}
            >
                Place Order
            </Button>
        </div>
    )
}

export default Order
