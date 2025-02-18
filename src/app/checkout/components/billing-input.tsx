'use client'

import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

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
    name: 'firstName' | 'lastName' | 'streetAddress' | 'city' | 'phone' | 'email' | 'companyName' | 'apartment' | 'orderNote'
    label: string
    placeholder?: string
}

export const BillingInput= ({ form, name, label }: Props) => {
    return (
        <div>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>  
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input className='rounded-sm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export const BillingTextArea= ({ form, name, label, placeholder }: Props) => {
    return (
        <div>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>  
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Textarea className='rounded-sm' {...field} placeholder={placeholder}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}