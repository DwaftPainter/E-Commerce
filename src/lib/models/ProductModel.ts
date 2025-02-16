import mongoose from 'mongoose'

export type Product = {
    _id: string
    name: string
    slug: string
    description: string
    price: number
    brand?: string
    discount: number
    image: string
    category?: string
    review: number
    rating: number
    countInStock: number
    colors?: []
    sizes?: []
}

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        max: 100
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    review: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    colors: {
        type: Array,
    },
    sizes: {
        type: Array,
    }
})

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema)

export default ProductModel
