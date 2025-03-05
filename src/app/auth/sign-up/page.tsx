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
import { formatNotification } from '@/utils/formatNotification'
import AuthLayout from '@/layouts/AuthLayout'
import { useAppContext } from '@/context/AppContext'

const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters!' }),
    email: z.string().email({ message: 'Invald email!' }),
    password: z.string().regex(passwordRegex, { message: validate.format.password2 })
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const { setUser } = useAppContext()
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData.message)
            }

            const { data } = responseData
            setUser(data)
            route.push('/')
            toast(
                formatNotification(notifications.account.accountCreated, {
                    USERNAME: data?.name
                })
            )
        } catch (error: any) {
            console.log(error.message)
            form.setError('email', { type: 'custom', message: error.message })
            console.error(error)
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
                            Create an account
                        </h1>
                        <p className=''>Enter your detail below</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Name'
                                        {...field}
                                        autoComplete='off'
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
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Password'
                                        type='password'
                                        autoComplete='off'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        type='submit'
                        className='bg-secondary2 w-full text-text text-[16px] font-medium  hover:bg-hover2 rounded-sm py-4 h-auto'
                    >
                        {loading ? 'Submiting' : 'Create Account'}
                    </Button>
                    <div className='flex justify-center gap-4'>
                        <p>Already have an account?</p>
                        <Link href={'/auth/sign-in'} className='font-medium hover:underline'>
                            Log in
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default page
