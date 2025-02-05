export type Product = {
    _id: string,
    name: string,
    price: number,
    discount: number,
    image: string,
    category?: string,
    review: number,
    rating: number
}