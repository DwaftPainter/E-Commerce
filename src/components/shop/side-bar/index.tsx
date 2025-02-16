'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { categoriesFilter, status, brands } from '@/utils/constants'
import SliderFilter from './SliderFilter'
import { BrandCheckBoxFilter, CategoryCheckBoxFilter, StatusCheckBoxFilter } from './CheckBoxFilter'
import { useShopContext } from '@/context/ShopConntext'

interface Props {
    className?: string
}

const ShopSidebar = ({ className }: Props) => {
    const {
        checked,
        setChecked,
        statusChecked,
        setStatusChecked,
        brandChecked,
        setBrandChecked,
        priceValue,
        setPriceValue,
        filter,
        setFilter
    } = useShopContext()

    return (
        <div className={cn('flex flex-col gap-7', className)}>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold'>Product Categories</h1>
                <CategoryCheckBoxFilter
                    categories={categoriesFilter}
                    setChecked={setChecked}
                    checked={checked}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold'>Filter By Price</h1>
                <SliderFilter priceValue={priceValue} setPriceValue={setPriceValue} setFilter={setFilter} />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold'>Product Status</h1>
                <StatusCheckBoxFilter
                    statuses={status}
                    statusChecked={statusChecked}
                    setStatusChecked={setStatusChecked}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold'>Brands</h1>
                <BrandCheckBoxFilter
                    brands={brands}
                    brandChecked={brandChecked}
                    setBrandChecked={setBrandChecked}
                />
            </div>
        </div>
    )
}

export default ShopSidebar
