import { Camera, Computer, Gamepad, Ham, Headphones, Shirt, Smartphone, Watch } from 'lucide-react'

export const NAV_LINKS = [
    { path: '/', name: 'Home' },
    { path: '/contact', name: 'Contact' },
    { path: '/about', name: 'About' },
    { path: '/shop', name: 'Shop' }
]

export const categories = [
    {
        name: 'Phones',
        icon: <Smartphone size={38} className='hover:text-white' />
    },
    {
        name: 'Computers',
        icon: <Computer size={38} className='hover:text-white' />
    },
    {
        name: 'SmartWatch',
        icon: <Watch size={38} className='hover:text-white' />
    },
    {
        name: 'Camera',
        icon: <Camera size={38} className='hover:text-white' />
    },
    {
        name: 'Headphones',
        icon: <Headphones size={38} className='hover:text-white' />
    },
    {
        name: 'Gaming',
        icon: <Gamepad size={38} className='hover:text-white' />
    },
    {
        name: 'Clothes',
        icon: <Shirt size={38} className='hover:text-white' />
    },
    {
        name: 'Foods',
        icon: <Ham size={38} className='hover:text-white' />
    }
]

export enum ROLES {
    USER = 'user',
    ADMIN = 'admin'
}

export const categoriesFilter = [
    {
        id: 1,
        name: 'Electronics',
        items: [
            { id: 101, name: 'Laptop' },
            { id: 102, name: 'Smartphone' },
            { id: 103, name: 'Headphones' },
            { id: 104, name: 'Smartwatch' }
        ]
    },
    {
        id: 2,
        name: 'Clothing',
        items: [
            { id: 201, name: 'T-shirt' },
            { id: 202, name: 'Jeans' },
            { id: 203, name: 'Jacket' },
            { id: 204, name: 'Sneakers' }
        ]
    },
    {
        id: 3,
        name: 'Home & Kitchen',
        items: [
            { id: 301, name: 'Blender' },
            { id: 302, name: 'Coffee Maker' },
            { id: 303, name: 'Microwave' },
            { id: 304, name: 'Toaster' }
        ]
    },
    {
        id: 4,
        name: 'Books',
        items: [
            { id: 401, name: 'Fiction' },
            { id: 402, name: 'Non-fiction' },
            { id: 403, name: 'Science' },
            { id: 404, name: 'History' }
        ]
    },
    {
        id: 5,
        name: 'Sports & Outdoors',
        items: [
            { id: 501, name: 'Bicycle' },
            { id: 502, name: 'Tennis Racket' },
            { id: 503, name: 'Yoga Mat' },
            { id: 504, name: 'Camping Tent' }
        ]
    },
    {
        id: 6,
        name: 'Furniture',
        items: []
    }
]

export const status = ['In Stock', 'On Sale']

export const brands = [
    { name: 'Nike', productCount: 120 },
    { name: 'Apple', productCount: 85 },
    { name: 'Samsung', productCount: 95 },
    { name: 'Adidas', productCount: 110 },
    { name: 'Sony', productCount: 70 },
    { name: 'LG', productCount: 60 }
]
