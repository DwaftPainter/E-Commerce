'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { validate } from '@/config/message'
import { passwordRegex } from '@/config/regex'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters!' }),
    email: z.string().email({ message: 'Invald email!' }),
    password: z.string().regex(passwordRegex, { message: validate.format.password2 })
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
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
            const response = await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            setLoading(false)
            
            if (response.ok) {
                route.push('/')
            }
        } catch (error: any) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div className='mt-20 flex gap-[130px]'>
            <img className='-ml-[135px] w-[65%] max-h-[800px]' src='/assets/images/side-image.png' alt='' />
            <Form {...form}>
                <form
                    action=''
                    className='flex w-[35%] flex-col gap-10 justify-center items-center -mr-[135px]'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='flex flex-col gap-6 w-full items-start'>
                        <h1 className='font-medium text-[36px] tracking-widest'>Create an account</h1>
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
        </div>
    )
}

export default page
