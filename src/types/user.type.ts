import mongoose from "mongoose"

export type UserType = {
    _id: string
    name: string
    firstName?: string
    lastName?: string
    address?: string
    email: string
    phone?: string
    password: string
    cart: mongoose.Types.ObjectId[] | []
    wishlist: mongoose.Types.ObjectId[] | []
    role: string
    deleted: boolean
    deletedAt?: Date
    DeletedBy?: mongoose.Types.ObjectId
}