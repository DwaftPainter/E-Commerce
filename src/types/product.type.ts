export type ProductType = {
    _id: string
    name: string
    slug: string
    description: string
    price: number
    brand?: string
    discount: number
    image: string
    category?: string
    review?: number
    rating?: number
    countInStock: number
    colors?: []
    sizes?: []
}