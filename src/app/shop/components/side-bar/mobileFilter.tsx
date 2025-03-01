'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { categories, status, brands } from '@/utils/constants'
import SliderFilter from './SliderFilter'
import { BrandCheckBoxFilter, CategoryCheckBoxFilter, StatusCheckBoxFilter } from './CheckBoxFilter'
import { Filter, X } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import { useShopContext } from '@/context/ShopConntext'
import { Separator } from '@/components/ui/separator'

interface Props {
    className?: string
}
const MobileFilter = ({ className }: Props) => {
    const [open, setOpen] = React.useState(false)
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
        <Drawer direction='left' dismissible={false} open={open}>
            <DrawerTrigger asChild className='lg:hidden block'>
                <button className='flex gap-2 items-center' onClick={() => setOpen(prev => !prev)}>
                    <Filter size={16}/>
                    <p className='text-sm font-semibold sm:inline-block hidden'>Filter Porducts</p>
                </button>
            </DrawerTrigger>
            <DrawerContent className='h-full md:max-w-lg rounded-none overflow-scroll'>
                <div className='overflow-scroll w-full px-4'>
                    <div className='w-full h-fit'>
                        <DrawerHeader className='flex justify-between items-center w-full px-0 pb-0'>
                            <DrawerTitle className='text-xl font-semibold'>Filter Products</DrawerTitle>
                            <DrawerClose className='bg-secondary2 h-5 w-5 bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer' onClick={() => setOpen(prev => !prev)}>
                                <X size={16} color={'white'} />
                            </DrawerClose>
                        </DrawerHeader>
                    </div>
                    <Separator className='my-7' />
                    <div className={cn('flex flex-col', className)}>
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold'>Product Categories</h1>
                            <CategoryCheckBoxFilter
                                categories={categories}
                                setChecked={setChecked}
                                checked={checked}
                            />
                        </div>
                        <Separator className='my-7' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold'>Filter By Price</h1>
                            <SliderFilter
                                priceValue={priceValue}
                                setPriceValue={setPriceValue}
                                setFilter={setFilter}
                            />
                        </div>
                        <Separator className='my-7' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold'>Product Status</h1>
                            <StatusCheckBoxFilter
                                statuses={status}
                                statusChecked={statusChecked}
                                setStatusChecked={setStatusChecked}
                            />
                        </div>
                        <Separator className='my-7' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold'>Brands</h1>
                            <BrandCheckBoxFilter
                                brands={brands}
                                brandChecked={brandChecked}
                                setBrandChecked={setBrandChecked}
                            />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileFilter
