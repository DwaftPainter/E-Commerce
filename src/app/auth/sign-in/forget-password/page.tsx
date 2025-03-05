'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { validate, notifications } from '@/config/message'
import { passwordRegex } from '@/config/regex'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import AuthLayout from '@/layouts/AuthLayout'

const formSchema = z.object({
    email: z.string().email({ message: validate.format.email })
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const route = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/log-in/forget-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData.message)
            }
            localStorage.setItem('verify-email', values.email)
            route.push('/auth/sign-in/verify-otp')
        } catch (error: any) {
            form.setError('email', { type: 'custom', message: error.message })
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Form {...form}>
                <form
                    action=''
                    className='flex lg:w-[35%] w-full flex-col gap-10 justify-center items-center 2xl:-mr-[200px]'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='flex flex-col gap-6 w-full items-start sm:mt-16 lg:mt-0'>
                        <h1 className='lg:font-medium font-bold lg:text-[36px] text-2xl lg:self-start self-center tracking-widest'>
                            Forgot password?
                        </h1>
                        <p className=''>No worries, we'll send youreser instruction</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Email'
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between items-center w-full'>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='bg-secondary2 text-text text-[16px] font-medium hover:bg-hover2 rounded-sm lg:py-4 py-2 lg:px-12 px-4 h-auto'
                        >
                            {loading ? 'Submiting' : 'Reset password'}
                        </Button>
                        <div className='flex justify-center gap-4'>
                            <Link
                                href={'/auth/sign-in'}
                                className='font-medium hover:underline text-secondary2'
                            >
                                &#x2190; Back to login
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default page
