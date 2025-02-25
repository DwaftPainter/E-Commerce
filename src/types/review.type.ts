export type ReviewType = {
    _id: string,
    userId: string,
    productId: string,
    user: {
        name: string,
        avatar: string,
    },
    rating: number,
    comment: string,
    createdAt: string 
}