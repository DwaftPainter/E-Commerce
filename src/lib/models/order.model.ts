import { validate } from '@/config/message'
import { phoneRegex } from '@/config/regex'
import mongoose from 'mongoose'
var validator = require('validator')

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', // Reference to the Product model
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                _id: false
            }
        ],
        shippingAddress: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            phone: {
                type: String,
                required: true,
                validate: {
                    validator: function (v: any) {
                        return phoneRegex.test(v.toString())
                    },
                    message: validate.format.phone
                }
            },
            email: {
                type: String,
                required: true,
                validate: {
                    validator: function (v: any) {
                        return validator.isEmail(v)
                    },
                    message: validate.format.email
                }
            },
            companyName: { type: String },
            apartment: { type: String },
            orderNote: { type: String }
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'bank'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending'
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
)

const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default OrderModel
