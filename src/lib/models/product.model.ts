import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
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
        featuredImage: {
            type: [String],
            default: []
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
            type: Array
        },
        sizes: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default ProductModel
