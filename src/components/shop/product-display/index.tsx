'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import SortBar from './sort-bar'
import ShopPagination from './pagination'
import Product, { ListProduct } from '@/components/home/product/Product'
import { useShopContext } from '@/context/ShopConntext'
import Loading2 from '@/components/ui/loading2'

interface Props {
    className?: string
}

const gridConfig = {
    'list-view': {
        container: 'grid grid-cols-1 gap-4',
        product: ''
    },
    'compact-grid': {
        container: 'grid grid-cols-2 gap-8',
        product: 'max-w-[550px]'
    },
    'standard-grid': {
        container: 'grid grid-cols-3 gap-4',
        product: 'max-w-[450px]'
    },
    'dense-grid': {
        container: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3',
        product: 'max-w-[270px]'
    }
}

const ProductDisplay = ({ className }: Props) => {
    const { products, displayMode, setDisplayMode, sortType, setSortType, loading } = useShopContext()
    console.log('🚀 ~ ProductDisplay ~ loading:', loading)

    return (
        <div className={cn('flex flex-col w-full', className)}>
            <SortBar
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
                sortType={sortType}
                setSortType={setSortType}
                className='mb-5'
            />
            {loading ? (
                <div className='w-full flex items-center justify-center min-h-[500px]'>
                    <Loading2 />
                </div>
            ) : products.length === 0 ? (
                <div className='w-full flex items-center justify-center min-h-[500px]'>
                    {' '}
                    No products were found matching your selection.{' '}
                </div>
            ) : (
                <div className={gridConfig[displayMode].container}>
                    {products.map((product, index) => (
                        <div key={index}>
                            {displayMode === 'list-view' ? (
                                <ListProduct product={product} />
                            ) : (
                                <Product product={product} className={gridConfig[displayMode].product} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {products.length === 0 ? <></> : <ShopPagination className='mt-10' />}
        </div>
    )
}

export default ProductDisplay
