import React, { useRef } from 'react'
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
import { useIsMobile } from '@/hooks/use-mobile'
import SearchResultBox from './searchResultBox'

const Search = () => {
    const [products, setProducts] = React.useState<ProductType[]>([])
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState('')
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const isMobile = useIsMobile()

    React.useEffect(() => {
        if (!isMobile) {
            setOpen(false) // Ensure the drawer closes on desktop
            document.body.style.position = ''
        }
    }, [isMobile])

    React.useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            async function searchProducts() {
                const res = await fetch('/api/product')
                const { data } = await res.json()
                const filtedData = data?.filter((product: ProductType) =>
                    product.name
                        .toLowerCase()
                        .trim()
                        .replace(/\s/g, '')
                        .includes(input.toLowerCase().trim().replace(/\s/g, ''))
                )

                setProducts(filtedData)
            }
            searchProducts()
        }, 1000)

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
    }, [input])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        setInput(e.target.value)
    }

    return (
        <Drawer open={open} dismissible={false && !isMobile}>
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
                <SearchResultBox products={products} setOpen={setOpen} />
            </DrawerContent>
        </Drawer>
    )
}

export default Search
