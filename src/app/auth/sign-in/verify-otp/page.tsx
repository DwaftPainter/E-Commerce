'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import AuthLayout from '@/layouts/AuthLayout'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.'
    })
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const [verifyEmail, setVerifyEmail] = React.useState<string | null>(null)
    const route = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: ''
        }
    })

    React.useEffect(() => {
        setVerifyEmail(localStorage.getItem('verify-email'))
    }, [])

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch('/api/auth/log-in/verify-otp', {
                method: 'POST',
                headers: { 'ContentType' : 'application/json' },
                body: JSON.stringify({...values, email: verifyEmail})
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData?.message)
            }

            route.push('/auth/sign-in/reset-password')
        } catch (error: any) {
            form.setError('pin', { type: 'custom', message: error.message })
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
                        <p className=''>
                            We sent a code to <strong>{verifyEmail}</strong>
                        </p>
                    </div>
                    <FormField
                        control={form.control}
                        name='pin'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <InputOTPSlot
                                                    key={index}
                                                    index={index}
                                                    className='w-[50px] h-[50px]'
                                                />
                                            ))}
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <InputOTPSlot
                                                    key={index}
                                                    index={index + 3}
                                                    className='w-[50px] h-[50px]'
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to your email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={loading}
                        type='submit'
                        className='bg-secondary2 w-full text-text text-[16px] font-medium  hover:bg-hover2 rounded-sm py-4 h-auto'
                    >
                        {loading ? 'Submiting' : 'Continute'}
                    </Button>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default page
