'use client'

import { ProductType } from '@/types/product.type'
import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

interface ShopContextType {
    products: ProductType[]
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
    totalPages: number
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
    checked: Record<string, boolean>
    setChecked: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
    brandChecked: Record<string, boolean>
    setBrandChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    statusChecked: Record<string, boolean>
    setStatusChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    priceValue: number[]
    setPriceValue: React.Dispatch<React.SetStateAction<number[]>>
    filter: boolean
    setFilter: React.Dispatch<React.SetStateAction<boolean>>
    displayMode: DisplayType
    setDisplayMode: React.Dispatch<React.SetStateAction<DisplayType>>
    quantity: string
    setQuantity: React.Dispatch<React.SetStateAction<string>>
    sortType: SortType
    setSortType: React.Dispatch<React.SetStateAction<SortType>>
    loading: boolean
}

type SortType = 'popularity' | 'rating' | 'latest' | 'asc' | 'desc'
type DisplayType = 'list-view' | 'compact-grid' | 'standard-grid' | 'dense-grid'

const ShopContext = React.createContext<ShopContextType | null>(null)

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const searchParam = useSearchParams()
    const params = new URLSearchParams(searchParam.toString())

    const getBooleanParams = (param: string[]) => {
        return param ? param.reduce((total, current) => ({ ...total, [current]: true }), {}) : {}
    }

    // const paramsRef = React.useRef(new URLSearchParams(searchParam.toString()))
    const [checked, setChecked] = React.useState<Record<number, boolean>>(
        Object.fromEntries(
            (searchParam.get('filter_cat')?.split(',') ?? [])
                .filter(id => id.trim() !== '') // Ensure no empty strings
                .map(id => [Number(id), true])
        ) || {}
    )
    const [statusChecked, setStatusChecked] = React.useState<Record<string, boolean>>(
        getBooleanParams(searchParam.getAll('status')) || {}
    )
    const [brandChecked, setBrandChecked] = React.useState<Record<string, boolean>>(
        getBooleanParams(searchParam.getAll('brand')) || {}
    )
    const [priceValue, setPriceValue] = React.useState<number[]>([
        searchParam.get('min_price') ? Number(searchParam.get('min_price')) / 10 : 0,
        searchParam.get('max_price') ? Number(searchParam.get('max_price')) / 10 : 100
    ])
    const [filter, setFilter] = React.useState<boolean>(false)
    const [displayMode, setDisplayMode] = React.useState<DisplayType>(
        (searchParam.get('shop_view') as DisplayType) || 'dense-grid'
    )
    const [sortType, setSortType] = React.useState<SortType>(
        (searchParam.get('orderBy') as SortType) || 'popularity'
    )
    const [quantity, setQuantity] = React.useState(searchParam.get('perPage') || '12')
    const [products, setProducts] = React.useState<ProductType[]>([])
    const [totalPages, setTotalPages] = React.useState<number>(1)
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        params.set('perPage', quantity)
        params.set('orderBy', sortType)
        params.set('shop_view', displayMode)
        params.delete('min_price')
        params.delete('max_price')
        if (priceValue[0] !== 0 || priceValue[1] !== 100) {
            params.set('min_price', (priceValue[0] * 10).toString())
            params.set('max_price', (priceValue[1] * 10).toString())
        }

        params.delete('filter_cat')
        const selectedIds: string[] = []
        Object.entries(checked).forEach(([key, value]) => {
            if (value) {
                selectedIds.push(key) // Store valid category IDs
            }
        })

        // Append numeric IDs as a single 'filter_cat' value
        if (selectedIds.length > 0) {
            params.set('filter_cat', selectedIds.join(',')) // "filter_cat=50,51,52,53"
        }

        // Add selected status filters
        params.delete('status')
        Object.entries(statusChecked).forEach(([key, value]) => {
            if (value) {
                const status = key.toLocaleLowerCase().split(' ').join('')
                params.append('status', status)
            }
        })

        // Add selected brand filters
        params.delete('brand')
        Object.entries(brandChecked).forEach(([key, value]) => {
            console.log(brandChecked)
            if (value) params.append('brand', key.toLocaleLowerCase().split(' ').join(''))
        })

        router.push(`?${params.toString().replace(/%2C/g, ',')}`, { scroll: false })
        async function getProduct() {
            const res = await fetch(`/api/product/?${params.toString()}`)
            const { data, total } = await res.json()
            setProducts(data)
            setTotalPages(total)
            setLoading(false)
        }

        getProduct()
    }, [filter, statusChecked, brandChecked, checked, quantity, sortType, displayMode])

    return (
        <ShopContext.Provider
            value={{
                products,
                setProducts,
                checked,
                setChecked,
                statusChecked,
                setStatusChecked,
                brandChecked,
                setBrandChecked,
                priceValue,
                setPriceValue,
                setFilter,
                filter,
                displayMode,
                setDisplayMode,
                quantity,
                setQuantity,
                sortType,
                setSortType,
                totalPages,
                setTotalPages,
                loading
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}

export const useShopContext = () => {
    const context = React.useContext(ShopContext)
    if (!context) {
        throw new Error('useAppContext can not be used outside <ShopProvider>')
    }
    return context
}
