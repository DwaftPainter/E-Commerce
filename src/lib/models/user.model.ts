import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ROLES } from '@/utils/constants'
import { passwordRegex, phoneRegex } from '@/config/regex'
import { validate } from '@/config/message'
var validator = require('validator')

export interface User extends mongoose.Document {
    name: string
    email: string
    phone: string
    password: string
    cart: mongoose.Types.ObjectId[] | []
    wishlist: mongoose.Types.ObjectId[] | []
    role: string
    deleted: boolean
    deletedAt?: Date
    DeletedBy?: mongoose.Types.ObjectId
    isModified: (path: string) => boolean
}

const CartItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
    },
    { _id: false } // Disables automatic _id for cart items
)

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 50,
            trim: true
        },
        firstName: { type: String },
        lastName: { type: String },
        address: { type: String },
        avatar: {
            type: String,
            default: 'https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg'
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return validator.isEmail(v)
                },
                message: validate.format.email
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v: any) {
                    return phoneRegex.test(v.toString())
                },
                message: validate.format.phone
            }
        },
        password: {
            type: String,
            minLength: 8,
            trim: true,
            validate: {
                validator: function (v: any) {
                    // Only validate if password is not hashed (when setting a new password)
                    if (this.isModified('password')) {
                        return passwordRegex.test(v)
                    }
                    return true // Skip validation if it's already hashed
                },
                message: validate.format.password2
            }
        },
        cart: { type: [CartItemSchema], default: [] },
        wishlist: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }
            ],
            default: []
        },
        role: {
            type: String,
            enum: ROLES,
            default: ROLES.USER
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
        DeletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        this.password = await bcrypt.hash(this.password, 10)
        console.log(this.password)
        next()
    } catch (err) {
        next(err as any)
    }
})

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
export default UserModel
