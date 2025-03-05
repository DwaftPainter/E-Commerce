'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { ProductType } from '@/types/product.type'
import { Separator } from '@/components/ui/separator'
import StarRating from '@/components/home/product/StarRating'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/utils/formatDate'
import { ReviewType } from '@/types/review.type'

interface Props {
    product: ProductType | null
}

const formSchema = z.object({
    rating: z
        .number()
        .min(1, {
            message: 'Please rating the product!'
        })
        .max(5, {
            message: 'Please rating the product!'
        }),
    comment: z.string().min(1, {
        message: 'Please enter your review!'
    })
})

const ProductTab = ({ product }: Props) => {
    const [reviews, setReviews] = React.useState<ReviewType[]>([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            comment: ''
        }
    })

    React.useEffect(() => {
        async function getReviews() {
            try {
                const res = await fetch(`/api/review/${product?._id}`)
                const { reviews } = await res.json()

                setReviews(reviews)
            } catch (error: any) {
                console.log(error)
            }
        }
        getReviews()
    }, [])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await fetch('/api/review', {
                method: 'POST',
                headers: { ContentType: 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...values, productId: product?._id })
            })
            const { data } = await res.json()

            setReviews(prev => [...prev, data])
            console.log(reviews)
            //Notification
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Tabs className='w-full' defaultValue='description'>
            <TabsList className='w-full h-fit p-5 flex sm:flex-row flex-col sm:gap-0 gap-4 sm:items-center items-start justify-start rounded-sm'>
                <TabsTrigger className='px-5 font-bold' value='description'>
                    DESCRIPTION
                </TabsTrigger>
                <TabsTrigger className='px-5 font-bold' value='information'>
                    ADDITIONAL INFORMATION
                </TabsTrigger>
                <TabsTrigger className='px-5 font-bold' value='review'>
                    REVIEW({reviews?.length})
                </TabsTrigger>
            </TabsList>
            <TabsContent className='w-full' value='description'>
                <Card className='sm:px-10 sm:py-5 p-5 rounded-sm'>{product?.description}</Card>
            </TabsContent>
            <TabsContent className='w-full' value='information'>
                <Card className='sm:px-10 sm:py-5 p-5 rounded-sm'>
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                {product?.brand && (
                                    <>
                                        <td className='text-start w-[50%] border p-2'>Brand</td>
                                        <td className='text-start w-[50%] border p-2'>{product?.brand}</td>
                                    </>
                                )}
                            </tr>
                            <tr>
                                {product?.category && (
                                    <>
                                        <td className='text-start w-[50%] border p-2'>Category</td>
                                        <td className='text-start w-[50%] border p-2'>{product?.category}</td>
                                    </>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </TabsContent>
            <TabsContent className='w-full' value='review'>
                <Card className='sm:px-10 sm:py-5 p-5 rounded-sm'>
                    <div className=''>
                        {reviews?.length > 0 && (
                            <h1 className='mb-8 font-semibold'>
                                {reviews?.length} REVIEW FOR {product?.name.toUpperCase()}
                            </h1>
                        )}
                        {reviews?.map((review, index) => (
                            <div key={index} className='flex items-start gap-4 mb-10'>
                                <Avatar className='h-[60px] w-[60px]'>
                                    <AvatarImage src={review?.user?.avatar} alt='@shadcn' />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col gap-1.5'>
                                    <StarRating totalStars={5} initialRating={review?.rating} size='small' />
                                    <div className='flex items-center'>
                                        <p className='font-semibold'>{review?.user?.name}</p>&nbsp; -&nbsp;
                                        <p className='text-sm opacity-50'>{formatDate(review?.createdAt)}</p>
                                    </div>
                                    <p>{review?.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
                            <h1 className='font-medium text-[18px]'>Add a review</h1>
                            <Separator className='mb-3' />
                            <FormField
                                name='rating'
                                render={({ field }) => (
                                    <div className='flex gap-2 items-center'>
                                        <p className='text-sm'>Your Rating *:</p>
                                        <StarRating
                                            totalStars={5}
                                            initialRating={0}
                                            readOnly={false}
                                            onChange={field.onChange}
                                        />
                                    </div>
                                )}
                            />
                            <FormField
                                name='comment'
                                render={({ field }) => (
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm'>Your Review *:</p>
                                        <Textarea className='min-h-[250px] rounded-sm' {...field} />
                                    </div>
                                )}
                            />

                            <Button type='submit' className='bg-secondary2 hover:bg-hover2 w-fit rounded-sm'>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default ProductTab
