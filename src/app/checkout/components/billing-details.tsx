'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Form } from '@/components/ui/form'
import {BillingInput, BillingTextArea } from './billing-input'
import { UseFormReturn } from 'react-hook-form'

interface Props {
    form: UseFormReturn<
        {
            firstName: string
            lastName: string
            streetAddress: string
            city: string
            phone: string
            email: string
            companyName?: string | undefined
            apartment?: string | undefined
            orderNote?: string | undefined
        },
        any,
        undefined
    >
}

const BillingDetails = ({ form }: Props) => {
    return (
        <div className='border rounded-sm p-8'>
            <h1 className='font-semibold'>BILLING DETAIlS</h1>
            <Separator className='my-2' />
            <Form {...form}>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <BillingInput form={form} name='firstName' label='First Name *' />
                        <BillingInput form={form} name='lastName' label='Last Name *' />
                    </div>
                    <BillingInput form={form} name='companyName' label='Company Name (optional)' />
                    <BillingInput form={form} name='streetAddress' label='Street Address *' />
                    <BillingInput form={form} name='city' label='City/Town *' />
                    <BillingInput form={form} name='apartment' label='Apartment, floor, etc. (optional)' />
                    <div className='flex gap-4'>
                        <BillingInput form={form} name='phone' label='Phone Number *' />
                        <BillingInput form={form} name='email' label='Email Address *' />
                    </div>
                    <Separator className='my-2' />
                    <BillingTextArea form={form} name='orderNote' label='Order notes (optional)' placeholder='Note about your order, E.g: special notes for delivery.'/>
                </div>
            </Form>
        </div>
    )
}

export default BillingDetails
