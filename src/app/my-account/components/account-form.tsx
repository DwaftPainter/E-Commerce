'use client'

import React from 'react'
import { Button } from '../../../components/ui/button'
import { z } from 'zod'
import { passwordRegex } from '@/config/regex'
import { validate } from '@/config/message'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../../../components/ui/input'

const formSchema = z
    .object({
        firstName: z.string().min(2, { message: 'First name must be at least 2 characters long!' }),
        lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long!' }),
        email: z.string().email({ message: 'Invalid email address!' }),
        address: z.string().optional(),
        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(
        data => {
            // If newPassword is entered, currentPassword is required
            if (data.newPassword && !data.currentPassword) {
                return false
            }
            // If newPassword is entered, confirmPassword must match
            if (data.newPassword && data.newPassword !== data.confirmPassword) {
                return false
            }
            return true
        },
        {
            message:
                'New password must match confirm password, and current password is required to change password!',
            path: ['confirmPassword']
        }
    )

const AccountForm = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    React.useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await fetch('/api/me')
                if (!res.ok) throw new Error('Failed to fetch user data')

                const { data } = await res.json()
                form.reset({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    address: data.address || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            } catch (error) {
                console.error(error)
            }
        }

        getUserData()
    }, [form])

    const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        setSuccess(false)
        try {
            console.log(values)
            const res = await fetch('/api/me', {
                method: 'PUT',
                credentials: 'include',
                headers: { ContentTypes: 'application/json' },
                body: JSON.stringify(values)
            })

            setIsSubmitting(false)
            setSuccess(true)
        } catch (error) {
            console.error(error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className='flex flex-col rounded-sm sm:border sm:px-20 sm:py-12 w-full '>
            <h1 className='font-medium text-xl text-secondary2 mb-7'>Edit Your Profile</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmitForm)}
                    className='flex flex-col items-end gap-7 h-full'
                >
                    <div className='flex w-full gap-[2%] sm:flex-row flex-col'>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem className='sm:basis-[50%]'>
                                    <FormLabel>Fisrt Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='bg-secondary h-[50px]'
                                            placeholder='Your Fisrt Name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem className='sm:basis-[50%] w-full'>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='bg-secondary h-[50px]'
                                            placeholder='Your Last Email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex w-full gap-[2%] sm:flex-row flex-col'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='sm:basis-[50%]'>
                                    <FormLabel>Email</FormLabel>
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
                            name='address'
                            render={({ field }) => (
                                <FormItem className='sm:basis-[50%]'>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='bg-secondary h-[50px]'
                                            placeholder='Your Address'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-full'>
                        <h1 className='font-medium text-xl text-secondary2 mb-7'>Change Passwords</h1>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='currentPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                className='bg-secondary h-[50px]'
                                                placeholder='Current Password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='newPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                className='bg-secondary h-[50px]'
                                                placeholder='New Password'
                                                {...field}
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
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                className='bg-secondary h-[50px]'
                                                placeholder='Confirm New Password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-end items-center gap-4 mt-'>
                        <Button className='bg-transparentoutline-none rounded-sm px-12 py-4 font-medium text-back h-fit'>
                            Cancel
                        </Button>
                        <Button className='bg-secondary2 hover:bg-hover2 border rounded-sm px-12 py-4 font-medium h-fit'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AccountForm
