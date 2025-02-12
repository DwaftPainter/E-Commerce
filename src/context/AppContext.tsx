'use client'

import React from 'react'
import { validate } from '@/config/message'
import { UserType } from '@/types/user.type'
import { CartType } from '@/types/cart.type'
import { ProductType } from '@/types/product.type'
import { useRouter } from 'next/navigation'

interface AppContextType {
    user: UserType | null
    setUser: (user: UserType | null) => void
    handleLogout: () => void
    cartItems: CartType[]
    setCartItems: (cartItems: CartType[]) => void
    addToCart: (product: ProductType) => void
    removeFromCart: (productId: string) => void
    updateToCart: (productId: string, quantity: number) => void
    cartTotal: number
    cartCount: number
    wishItems: ProductType[]
    setWishItems: (product: ProductType[]) => void
    addToWishList: (product: ProductType) => void
    removeFromWishList: (productId: string) => void
    wishListCount: number
}

const AppContext = React.createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<UserType | null>(null)
    const [cartItems, setCartItems] = React.useState<CartType[]>([])
    const [wishItems, setWishItems] = React.useState<ProductType[]>([])
    const route = useRouter()

    //Fetch Data
    React.useEffect(() => {
        async function getUser() {
            try {
                const res = await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`)
                if (res.ok) {
                    const { data } = await res.json()
                    setUser(data)
                    setCartItems(data.cart)
                    setWishItems(data.wishlist)
                } else {
                    throw new Error(validate.user_notfound)
                }
            } catch (error: any) {
                console.log(error.message)
            }
        }

        getUser()
    }, [])

    //Handle Log out
    const handleLogout = async () => {
        route.push('/auth/sign-in')
        await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
            method: 'POST',
            credentials: 'include'
        })

        setUser(null)
        setCartItems([])
        setWishItems([])
    }

    //Cart Modifify Function
    const addToCart = async (product: ProductType) => {
        const productIndex = cartItems?.findIndex(item => item.product._id === product._id)
        if (productIndex !== -1) {
            const cartItem = cartItems[productIndex]
            const updatedCartItem = {
                ...cartItem,
                quantity: cartItem.quantity + 1
            }

            const updatedCartItems = [...cartItems]
            updatedCartItems[productIndex] = updatedCartItem

            setCartItems(updatedCartItems)
            await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id, quantity: cartItem.quantity + 1 })
            })
        } else {
            setCartItems(prevCartItems => [...prevCartItems, { product, quantity: 1 }])
            console.log(cartItems)
            await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id, quantity: 1 })
            })
        }
    }

    const removeFromCart = async (productId: string) => {
        const updatedCartItems = cartItems?.filter(item => item.product._id !== productId)
        setCartItems(updatedCartItems)
        const res = await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/cart`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: productId })
        })

        const { data } = await res.json()
        setCartItems(data)
    }

    const updateToCart = async (productId: string, quantity: number) => {
        const productIndex = cartItems?.findIndex(item => item.product._id === productId)
        console.log(productIndex)
        if (productIndex !== -1) {
            const cartItem = cartItems[productIndex]
            const updatedCartItem = {
                ...cartItem,
                quantity
            }

            const updatedCartItems = [...cartItems]
            updatedCartItems[productIndex] = updatedCartItem
            setCartItems(updatedCartItems)
            await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: productId, quantity: quantity })
            })
        }
    }

    const cartCount = cartItems?.reduce((total, current) => total + current.quantity, 0)
    const cartTotal = cartItems?.reduce((total, current) => total + current.product.price, 0)

    //WishList Modifify Function
    const addToWishList = async (product: ProductType) => {
        const productIndex = wishItems?.findIndex(item => item._id === product._id)
        if (productIndex !== -1) {
            const updatedWishList = wishItems.filter(item => item._id !== product._id)
            setWishItems(updatedWishList)

            console.log('running')
            await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/wishlist`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id})
            })
            return
        }

        setWishItems(prevWishList => [...prevWishList, product])
        await fetch(`${
                   process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_PRODUCTION_URL
                        : process.env.NEXT_PUBLIC_BASE_URL}/api/product/wishlist`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product._id})
        })
    }

    const removeFromWishList = async (productId: string) => {}
    const wishListCount = wishItems?.length
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                handleLogout,
                cartItems,
                setCartItems,
                addToCart,
                removeFromCart,
                updateToCart,
                cartCount,
                cartTotal,
                wishItems,
                setWishItems,
                addToWishList,
                removeFromWishList,
                wishListCount
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = React.useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext can not be used outside <AppProvider>')
    }
    return context
}
