'use client'

import React from 'react'
import BillingDetails from './components/billing-details'
import Order from './components/order'
import { z } from 'zod'
import { validate } from '@/config/message'
import { phoneRegex } from '@/config/regex'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from '@/context/AppContext'
import Loading2 from '@/components/ui/loading2'
import { useOrderContext } from '@/context/OrderContext'

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
    const { user } = useAppContext()
    const { items } = useOrderContext()
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
        const checkoutData = {
            items: items,
            shippingAddress: values
        }
        await fetch('/api/order', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify(checkoutData)
        })
    }

    if (!user) {
        return (
          <div className='h-full w-full flex items-center justify-center min-h-[500px]'><Loading2/></div>
        )
    }

    return (
        <form className='flex gap-16 justify-between w-full' onSubmit={form.handleSubmit(handleSubmit)}>
            <BillingDetails form={form} />
            <Order />
        </form>
    )
}

export default page
