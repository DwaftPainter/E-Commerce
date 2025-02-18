'use client'

import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long!' }),
    email: z.string().email({ message: 'Invalid email address!' }),
    phone: z
        .string()
        .regex(/^[0-9]+$/, { message: 'Phone number must contain only digits!' })
        .min(9, { message: 'Phone number must be at least 9 digits!' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters!' })
})

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        setSuccess(false)
        try {
            console.log(values)
            // Simulate submission
            setTimeout(() => {
                setIsSubmitting(false)
                setSuccess(true)
                form.reset()
            }, 1000)
        } catch (error) {
            console.error(error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            <div className='flex flex-col gap-8 h-auto lg:h-[450px] col-span-1 rounded-sm shadow-custom p-6'>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10 h-10 bg-secondary2 rounded-full flex justify-center items-center'>
                            <Phone size={20} color='white' />
                        </span>
                        <h2 className='font-medium'>Call To Us</h2>
                    </div>
                    <div className='text-sm flex flex-col gap-4'>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p>Phone: +84912345678</p>
                    </div>
                </div>
                <Separator />
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-4 items-center'>
                        <span className='w-10 h-10 bg-secondary2 rounded-full flex justify-center items-center'>
                            <Mail size={20} color='white' />
                        </span>
                        <h2 className='font-medium'>Write To Us</h2>
                    </div>
                    <div className='text-sm flex flex-col gap-4'>
                        <p>Fill out our form and we will contact you within 24 hours.</p>
                        <p>Email: customer@exclusive.com</p>
                        <p>Email: support@exclusive.com</p>
                    </div>
                </div>
            </div>
            <div className='col-span-1 lg:col-span-3 rounded-sm shadow-custom px-6 py-8'>
                {success && (
                    <p className='text-green-500 font-medium mb-6'>
                        Your message has been successfully sent!
                    </p>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-end gap-8 h-full'>
                        <div className='flex w-full gap-[5%]'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='basis-[30%]'>
                                        <FormControl>
                                            <Input
                                                className='bg-secondary h-[50px]'
                                                placeholder='Your Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='basis-[30%]'>
                                        <FormControl>
                                            <Input
                                                className='bg-secondary h-[50px]'
                                                placeholder='Your Email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem className='basis-[30%]'>
                                        <FormControl>
                                            <Input
                                                className='bg-secondary h-[50px]'
                                                placeholder='Your Phone'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='message'
                            render={({ field }) => (
                                <FormItem className='w-full h-full'>
                                    <FormControl>
                                        <Textarea
                                            className='bg-secondary h-full'
                                            placeholder='Your Message'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isSubmitting}
                            className='bg-secondary2 hover:bg-hover2 rounded-[4px] h-[56px] px-[48px] py-[16px] font-medium'
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Contact
