'use client'

import React from 'react'
import BillingDetails from './components/billing-details'
import Order from './components/order'
import { z } from 'zod'
import notifications, { validate } from '@/config/message'
import { phoneRegex } from '@/config/regex'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from '@/context/AppContext'
import Loading2 from '@/components/ui/loading2'
import { useOrderContext } from '@/context/OrderContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { formatNotification } from '@/utils/formatNotification'

const formSchema = z.object({
    firstName: z.string().trim().min(1, { message: validate.format.firstName }),
    lastName: z.string().trim().min(1, { message: validate.format.lastName }),
    companyName: z.string().trim().min(1, { message: validate.format.companyName }).optional(),
    streetAddress: z.string().trim().min(1, { message: validate.format.streetAddress }),
    apartment: z.string().trim().optional(),
    city: z.string().trim(),
    phone: z.string().trim().regex(phoneRegex, { message: validate.format.phone }),
    email: z.string().trim().email({ message: validate.format.email }),
    orderNote: z.string().trim().optional()
})

const page = () => {
    const router = useRouter()
    const { user, removeAllFromCart } = useAppContext()
    const { items } = useOrderContext()
    const [payMethod, setPayMethod] = React.useState<'cash' | 'bank'>('cash')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            companyName: '',
            streetAddress: '',
            city: '',
            apartment: '',
            phone: '',
            email: '',
            orderNote: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const checkoutData = {
                items: items,
                shippingAddress: values,
                paymentMethod: payMethod
            }
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(checkoutData)
            })

            const responseData = await res.json()

            if (res.ok) {
                const { data } = responseData
                removeAllFromCart()
                router.push(`/checkout/order-received?orderId=${data._id}`)
                toast.success(formatNotification(notifications.order.orderConfirmation, {
                    ORDER_NUMBER: data?._id?.toString().split('').slice(-4).join('')
                }))
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    if (!user) {
        return (
            <div className='h-full w-full flex items-center justify-center min-h-[500px]'>
                <Loading2 />
            </div>
        )
    }

    return (
        <form
            className='flex lg:flex-row flex-col gap-16 justify-between w-full'
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <BillingDetails form={form} />
            <Order payMethod={payMethod} setPayMethod={setPayMethod} />
        </form>
    )
}

export default page
