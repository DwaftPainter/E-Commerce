'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import AuthLayout from '@/layouts/AuthLayout'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import notifications from '@/config/message'

const FormSchema = z
    .object({
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(
        data => {
            // If newPassword is entered, confirmPassword must match
            if (data.newPassword !== data.confirmPassword) {
                return false
            }
            return true
        },
        {
            message: 'New password must match confirm password!',
            path: ['confirmPassword']
        }
    )

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const [verifyEmail, setVerifyEmail] = React.useState<string | null>(null)
    const route = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    })

    React.useEffect(() => {
        setVerifyEmail(localStorage.getItem('verify-email'))
    }, [])

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch('/api/auth/log-in/reset-password', {
                method: 'POST',
                headers: { 'ContentType' : 'application/json' },
                body: JSON.stringify({...values, email: verifyEmail})
            })

            const responseData = await res.json()
            console.log("🚀 ~ onSubmit ~ responseData:", responseData)

            if (!res.ok) {
                throw new Error(responseData?.message)
            }

            route.push('/auth/sign-in')
            console.log("Running")
            toast.success(notifications.account.emailVerified)
        } catch (error: any) {
            // form.setError('pin', { type: 'custom', message: error.message })
            console.log(error)
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
                            Set new password
                        </h1>
                    </div>
                    <FormField
                        control={form.control}
                        name='newPassword'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='New password'
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
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Confirm password'
                                        {...field}
                                        autoComplete='off'
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
                        {loading ? 'Submiting' : 'Reset password'}
                    </Button>
                    <div className='flex justify-center items-center gap-4'>
                        <Link href={'/auth/sign-in'} className='font-medium hover:underline text-secondary2'>
                            &#x2190; Back to login
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default page
