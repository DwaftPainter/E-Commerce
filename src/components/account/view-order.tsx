import React from 'react'
import Loading2 from '../ui/loading2'
import { useSearchParams } from 'next/navigation'
import { OrderType } from '@/types/order.type'

const ViewOrder = () => {
    const [order, setOrder] = React.useState<OrderType | null>(null)
    const searchParam = useSearchParams()

    React.useEffect(() => {
        async function getOrder() {
            try {
                const res = await fetch(`/api/order?orderId=${searchParam.get('orderId')}`)
                const { data } = await res.json()

                setOrder(data)
            } catch (error) {
                console.log(error)
            }
        }

        getOrder()
    }, [])

    if (!order) {
        return (
            <div className='h-full w-full flex items-center justify-center min-h-[500px]'>
                <Loading2 />
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col justify-start'>
            <h1 className='font-2xl font-bold mb-2'>ORDER DETAILS</h1>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='text-start p-2 border w-[70%]'>Product</th>
                        <th className='text-start p-2 border'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.items?.map((item, index) => (
                        <tr key={index}>
                            <td className='p-2 border'>{item?.product?.name}</td>
                            <td className='p-2 border'>${item?.product?.price.toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <th className='p-2 border text-left'>Subtotal:</th>
                        <td className='p-2 border'>
                            $
                            {order?.items
                                ?.reduce((total, item) => total + item.product.price * item.quantity, 0)
                                .toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <th className='p-2 border text-left'>Shipping:</th>
                        <td className='p-2 border'>${Number(5).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th className='p-2 border text-left'>Payment method:</th>
                        <td className='p-2 border'>
                            {order?.paymentMethod === 'cash' ? 'Cash on delivery' : 'Direct bank transfer'}
                        </td>
                    </tr>
                    <tr>
                        <th className='p-2 border text-left'>Total:</th>
                        <td className='p-2 border'>
                            $
                            {order?.items
                                ?.reduce((total, item) => total + item.product.price * item.quantity, 5)
                                .toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewOrder
