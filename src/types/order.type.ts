import { Types } from "mongoose";
import { ProductType } from "./product.type";

export interface OrderType {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    items: {
        product: ProductType;
        quantity: number;
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        streetAddress: string;
        city: string;
        phone: string;
        email: string;
        companyName?: string;
        apartment?: string;
        orderNote?: string;
    };
    paymentMethod: 'cash' | 'bank';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}
