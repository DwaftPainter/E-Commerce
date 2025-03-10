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
    addToCart: (product: ProductType, quantity?: number) => void
    deleteFromCart: (productId: string) => void
    removeFromCart: (productId: string) => void
    removeAllFromCart: () => void
    updateToCart: (productId: string, quantity: number) => void
    updateCartBulk: (updates: CartType[]) => void
    getCartItem: (productId: string) => CartType | null
    cartTotal: number
    cartCount: number
    wishItems: ProductType[]
    setWishItems: (product: ProductType[]) => void
    addToWishList: (product: ProductType) => void
    removeFromWishList: (productId: string) => void
    wishListCount: number
    previewProducts: ProductType[]
    featureProducts: ProductType[]
}

const AppContext = React.createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<UserType | null>(null)
    const [cartItems, setCartItems] = React.useState<CartType[]>([])
    const [wishItems, setWishItems] = React.useState<ProductType[]>([])
    const [previewProducts, setPreviewProducts] = React.useState<ProductType[]>([])
    const [featureProducts, setFeatureProducts] = React.useState<ProductType[]>([])
    const route = useRouter()

    //Fetch Data
    React.useEffect(() => {
        async function getInitData() {
            try {
                const res = await fetch(`/api/init`)
                if (res.ok) {
                    const { data } = await res.json()
                    const { user, products } = data

                    setUser(user)
                    setCartItems(user?.cart)
                    setWishItems(user?.wishlist)
                    setPreviewProducts(products)
                    setFeatureProducts(products.filter((product: ProductType) => product.isFeatured === true))
                } else {
                    throw new Error(validate.user_notfound)
                }
            } catch (error: any) {
                console.log(error.message)
            }
        }

        getInitData()
    }, [])

    //Handle Log out
    const handleLogout = async () => {
        route.push('/auth/sign-in')
        await fetch(`/api/auth/log-out`, {
            method: 'POST',
            credentials: 'include'
        })

        setUser(null)
        setCartItems([])
        setWishItems([])
    }

    //Cart Modifify Function
    const addToCart = async (product: ProductType, quantity?: number) => {
        const productIndex = cartItems?.findIndex(item => item.product._id === product._id)
        if (productIndex !== -1) {
            const cartItem = cartItems[productIndex]
            const updatedCartItem = {
                ...cartItem,
                quantity: quantity ? cartItem?.quantity + quantity : cartItem?.quantity + 1
            }

            const updatedCartItems = [...cartItems]
            updatedCartItems[productIndex] = updatedCartItem

            setCartItems(updatedCartItems)
            await fetch(`/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    productId: product._id,
                    quantity: quantity ? cartItem?.quantity + quantity : cartItem?.quantity + 1
                })
            })
        } else {
            setCartItems(prevCartItems => [...prevCartItems, { product, quantity: 1 }])
            console.log(cartItems)
            await fetch(`/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id, quantity: quantity || 1 })
            })
        }
    }

    const deleteFromCart = async (productId: string) => {
        const productIndex = cartItems?.findIndex(item => item.product._id === productId)
        if (productIndex !== -1) {
            const cartItem = cartItems[productIndex]
            const updatedCartItem = {
                ...cartItem,
                quantity: cartItem?.quantity - 1
            }

            if (updatedCartItem.quantity === 0) {
                removeFromCart(productId)
                return
            }

            const updatedCartItems = [...cartItems]
            updatedCartItems[productIndex] = updatedCartItem

            setCartItems(updatedCartItems)
            await fetch(`/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId, quantity: cartItem?.quantity - 1 })
            })
        }
    }

    const removeFromCart = async (productId: string) => {
        const updatedCartItems = cartItems?.filter(item => item.product._id !== productId)
        setCartItems(updatedCartItems)
        const res = await fetch(`/api/product/cart`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: productId })
        })

        const { data } = await res.json()
        setCartItems(data)
    }

    const removeAllFromCart = async () => {
        setCartItems([])
        const res = await fetch(`/api/product/cart`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({})
        })

        const { data } = await res.json()
        setCartItems(data)
    }

    const updateToCart = async (productId: string, quantity: number) => {
        const productIndex = cartItems?.findIndex(item => item.product._id === productId)
        if (productIndex !== -1) {
            const cartItem = cartItems[productIndex]
            const updatedCartItem = {
                ...cartItem,
                quantity
            }

            const updatedCartItems = [...cartItems]
            updatedCartItems[productIndex] = updatedCartItem
            setCartItems(updatedCartItems)
            await fetch(`/api/product/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: productId, quantity: quantity })
            })
        }
    }

    const updateCartBulk = async (updates: CartType[]) => {
        if (updates.length === 0) {
            await fetch(`/api/product/cart`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ updatedCartItems: [] })
            })
            setCartItems([])
            return
        }

        // Update the local state
        const updatedCartItems = updates.map(item => {
            const updateIndex = cartItems?.findIndex(u => u.product._id === item.product._id)
            let updateItem: CartType
            if (updateIndex >= 0) {
                updateItem = { ...item, quantity: cartItems[updateIndex]?.quantity + 1 }
                return updateItem
            }
            return item
        })

        let filteredCartItems: CartType[] = []
        filteredCartItems = cartItems?.filter(item =>
            updatedCartItems.every(u => u.product._id !== item.product._id)
        )
        setCartItems([...filteredCartItems, ...updatedCartItems])

        await fetch(`/api/product/cart`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ updatedCartItems: [...filteredCartItems, ...updatedCartItems] })
        })
    }

    const getCartItem = (productId: string) => {
        const product = cartItems?.find(item => item.product._id === productId)
        return product || null
    }

    const cartCount = cartItems?.reduce((total, current) => total + current?.quantity, 0)
    const cartTotal = cartItems?.reduce(
        (total, current) => total + current?.product?.price * current?.quantity,
        0
    )

    //WishList Modifify Function
    const addToWishList = async (product: ProductType) => {
        const productIndex = wishItems?.findIndex(item => item._id === product._id)
        if (productIndex !== -1) {
            const updatedWishList = wishItems?.filter(item => item._id !== product._id)
            setWishItems(updatedWishList)

            console.log('running')
            await fetch(`/api/product/wishlist`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id })
            })
            return
        }

        setWishItems(prevWishList => [...prevWishList, product])
        await fetch(`/api/product/wishlist`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product._id })
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
                deleteFromCart,
                removeFromCart,
                removeAllFromCart,
                updateToCart,
                updateCartBulk,
                getCartItem,
                cartCount,
                cartTotal,
                wishItems,
                setWishItems,
                addToWishList,
                removeFromWishList,
                wishListCount,
                previewProducts,
                featureProducts
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
