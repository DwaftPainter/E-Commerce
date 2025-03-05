'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { notifications } from '@/config/message'
import { useAppContext } from '@/context/AppContext'
import { formatNotification } from '@/utils/formatters/formatNotification'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import AuthLayout from '@/layouts/AuthLayout'

const formSchema = z.object({
    email: z.string().email({ message: 'Invald email!' }),
    password: z.string()
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const { setUser, setCartItems, setWishItems } = useAppContext()
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/log-in`, {
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
            setUser(data || null)
            setCartItems(data?.cart)
            setWishItems(data?.wishlist)

            route.push('/')
            route.refresh()
            toast(
                formatNotification(notifications.account.accountLogIn, {
                    USERNAME: data?.name
                }),
                {
                    icon: <UserRoundCheck size={20} />
                }
            )
        } catch (error: any) {
            form.setError('password', { type: 'custom', message: error.message })
            console.error('Login error:', error)
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
                    <div className='flex flex-col gap-6 w-full lg:items-start lg:mt-0 mt-16'>
                        <h1 className='lg:font-medium font-bold lg:text-[36px] text-2xl tracking-widest lg:self-start self-center'>
                            Log in to Exclusive
                        </h1>
                        <p className=''>Enter your detail below</p>
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
                    <div className='flex justify-between items-center w-full'>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='bg-secondary2 text-text text-[16px] font-medium hover:bg-hover2 rounded-sm lg:py-4 py-2 lg:px-12 px-4 h-auto'
                        >
                            {loading ? 'Submiting' : 'Log in'}
                        </Button>
                        <div className='flex justify-center gap-4'>
                            <Link
                                href={'/auth/sign-in/forget-password'}
                                className='font-medium hover:underline text-secondary2'
                            >
                                Forget Password?
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <p>Create a new account?</p>
                        <Link href={'/auth/sign-up'} className='font-medium hover:underline'>
                            Register
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default page
