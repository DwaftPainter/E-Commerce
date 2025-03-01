import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import { SearchIcon, X } from 'lucide-react'
import { ProductType } from '@/types/product.type'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const Search = () => {
    const [products, setProducts] = React.useState<ProductType[]>([])
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState('')

    React.useEffect(() => {
        async function searchProducts() {
            const res = await fetch('/api/product')
            const { data } = await res.json()
            const filtedData = data.filter((product: ProductType) => product.name.includes(input))

            setProducts(filtedData)
        }
        searchProducts()
    }, [input])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        setInput(e.target.value)
    }

    return (
        <Drawer open={open} dismissible={false}>
            <DrawerTrigger
                className='flex flex-col items-center justify-center'
                onClick={() => setOpen(prev => !prev)}
            >
                <SearchIcon size={20} />
                <p className='text-[10px]'>Search</p>
            </DrawerTrigger>
            <DrawerContent className='h-full rounded-none p-4'>
                <DrawerHeader className='flex items-center justify-between px-0'>
                    <DrawerTitle>Search for products:</DrawerTitle>
                    <DrawerClose
                        className='bg-secondary2 h-5 w-5 bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer'
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <X size={16} color={'white'} />
                    </DrawerClose>
                </DrawerHeader>
                <div className='relative w-full flex items-center'>
                    <Input
                        className='pl-9 pr-[25px] py-3 border rounded-sm h-fit'
                        type='text'
                        placeholder='What are you looking for?'
                        onChange={handleChange}
                        value={input}
                    />
                    <div className='absolute top-4 left-3'>
                        <SearchIcon size={'18px'} className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex flex-col w-full border rounded-sm mt-5'>
                    {products?.length > 0 &&
                        products?.slice(0, 7).map((product, index) => (
                            <div className='flex items-center justify-between px-2 py-3' key={index}>
                                <div className='flex items-center max-w-[300px]'>
                                    <img
                                        src={product?.image}
                                        alt=''
                                        className='h-[42px] w-[42px] mr-2 rounded-sm'
                                    />
                                    <p className='text-sm font-semibold'>{product?.name}</p>
                                </div>
                                <div className='text-center'>
                                    {product?.discount > 0 ? (
                                        <>
                                            <p className='line-through text-[12px] text-[#C2C2D3]'>
                                                ${(product?.price).toFixed(2)}
                                            </p>
                                            <p className='text-secondary2 text-sm font-semibold'>
                                                $
                                                {(
                                                    product?.price -
                                                    (product?.price * product?.discount) / 100
                                                ).toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className='text-secondary2 text-sm font-semibold'>
                                            ${(product?.price).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    <Link
                        href={'/shop'}
                        className='self-center my-2 cursor-pointer'
                        onClick={() => setOpen(prev => !prev)}
                    >
                        See all product({products?.length})...
                    </Link>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default Search
