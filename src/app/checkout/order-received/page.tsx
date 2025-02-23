"use client";

import React from "react";
import { OrderType } from "@/types/order.type";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import Loading2 from "@/components/ui/loading2";

const page = () => {
    const [order, setOrder] = React.useState<OrderType | null>(null);
    const searchParam = useSearchParams();

    React.useEffect(() => {
        async function getOrder() {
            try {
                const res = await fetch(`/api/order?orderId=${searchParam.get("orderId")}`);
                const { data } = await res.json();

                setOrder(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        getOrder();
    }, []);

    if (!order) {
        return (
            <div className="h-full w-full flex items-center justify-center min-h-[500px]">
                <Loading2 />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="w-full h-fit p-7 text-center border-[2px] border-dashed border-success text-2xl font-semibold text-success">
                Thank you. Your order has been received.
            </div>
            <div className="w-full h-fit flex sm:flex-row flex-col sm:justify-between sm:gap-0 gap-4 sm:items-center items-start shadow-custom py-6 px-5">
                <div className="flex flex-col justify-center items-start text-sm">
                    <p>Order number:</p>
                    <p className="font-bold">{order?._id?.toString()}</p>
                </div>
                <div className="flex flex-col justify-center items-start text-sm">
                    <p>Date:</p>
                    <p className="font-bold">{formatDate(order.createdAt?.toString())}</p>
                </div>
                <div className="flex flex-col justify-center items-start text-sm">
                    <p>Total:</p>
                    <p className="font-bold">
                        $
                        {order?.items
                            ?.reduce((total, item) => total + item.product.price * item.quantity, 5)
                            .toFixed(2)}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-start text-sm">
                    <p>Payment method:</p>
                    <p className="font-bold">
                        {order?.paymentMethod === "cash" ? "Cash on delivery" : "Direct bank transfer"}
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col justify-start">
                <h1 className="font-2xl font-bold mb-2">ORDER DETAILS</h1>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-start p-2 border w-[70%]">Product</th>
                            <th className="text-start p-2 border">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.items?.map((item, index) => (
                            <tr key={index}>
                                <td className="p-2 border">{item?.product?.name}</td>
                                <td className="p-2 border">${item?.product?.price.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <th className="p-2 border text-left">Subtotal:</th>
                            <td className="p-2 border">
                                $
                                {order?.items
                                    ?.reduce((total, item) => total + item.product.price * item.quantity, 0)
                                    .toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <th className="p-2 border text-left">Shipping:</th>
                            <td className="p-2 border">${Number(5).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th className="p-2 border text-left">Payment method:</th>
                            <td className="p-2 border">
                                {order?.paymentMethod === "cash"
                                    ? "Cash on delivery"
                                    : "Direct bank transfer"}
                            </td>
                        </tr>
                        <tr>
                            <th className="p-2 border text-left">Total:</th>
                            <td className="p-2 border">
                                $
                                {order?.items
                                    ?.reduce((total, item) => total + item.product.price * item.quantity, 5)
                                    .toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col">
                <h1 className="font-2xl font-bold mb-2">SHIPPING ADDRESS</h1>
                <p>Name: {order?.shippingAddress?.lastName + " " + order?.shippingAddress?.firstName}</p>
                <p>Phone: {order?.shippingAddress?.phone}</p>
                <p>
                    Address: {order?.shippingAddress?.apartment +
                        ", " +
                        order?.shippingAddress?.streetAddress +
                        ", " +
                        order?.shippingAddress?.city}
                </p>
            </div>
        </div>
    );
};

export default page;
