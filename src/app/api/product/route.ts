import DBConnect from '@/lib/db'
import ProductModel from '@/lib/models/product.model'
import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/lib/models/product.model'
import slugify from 'slugify'
import { categories } from '@/utils/constants'

export const GET = async (req: NextRequest) => {
    try {
        await DBConnect()
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get('page')) || 1
        const perPage = Number(searchParams.get('perPage')) || 12
        const minPrice = Number(searchParams.get('min_price')) * 10 || 0
        const maxPrice = Number(searchParams.get('max_price')) * 10 || 1000
        const statuses = searchParams.getAll('status')
        const brand = searchParams.getAll('brand')
        const categoryMap = new Map<number, string>()

        categories.forEach(category => {
            categoryMap.set(category.id, category.name)
            category.items.forEach(item => categoryMap.set(item.id, item.name))
        })

        // **Chuyển đổi ID từ URL sang tên danh mục**
        const categoryNames = (searchParams.get('filter_cat')?.split(',') ?? [])
        .map(id => categoryMap.get(Number(id))?.toLowerCase())
        .filter(Boolean)

        const products = await ProductModel.find({})

        const filteredProducts = products.filter(product => {
            if (categoryNames.length > 0) {
                return (
                    product.price >= minPrice &&
                    product.price <= maxPrice &&
                    categoryNames.some(category => {
                       return product.category.toLowerCase() === category
                    })
                )
            }
            if (statuses.length > 0) {
                return (
                    product.price >= minPrice &&
                    product.price <= maxPrice &&
                    statuses.every(status => {
                        if (status === 'instock') {
                            return product.countInStock > 0
                        }
                        if (status === 'onsale') {
                            return product.discount > 0
                        }
                        return false
                    })
                )
            }
            if (brand.length > 0) {
                return (
                    product.price >= minPrice &&
                    product.price <= maxPrice &&
                    brand.find(brand => brand === product.brand)
                )
            }
            return product.price >= minPrice && product.price <= maxPrice
        })

        const startIndex = (page - 1) * perPage
        const endIndex = startIndex + perPage
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
        const totalPages = Math.ceil(products.length / perPage)

        console.log(paginatedProducts)
        return NextResponse.json(
            { message: 'success', data: paginatedProducts, total: totalPages, currentPage: page },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await DBConnect()
        const body = await req.json()
        body.forEach((product: Product) => (product.slug = slugify(product.name)))

        const product = await ProductModel.create(body)

        return NextResponse.json({ message: 'success', data: product }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

export const PUT = async () => {
    try {
        await DBConnect()
        const products = await ProductModel.find({})
        products.forEach(async (product: Product) => {
            await ProductModel.updateOne(
                { _id: product._id },
                { $set: { discount: Math.floor(Math.random() * 100) } }
            )
        })

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}
