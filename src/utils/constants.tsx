import { Armchair, Book, Dumbbell, Ham, Microwave, Shirt, Sparkles, Zap } from 'lucide-react'

export enum ROLES {
    USER = 'user',
    ADMIN = 'admin'
}

export const NAV_LINKS = [
    { path: '/', name: 'Home' },
    { path: '/contact', name: 'Contact' },
    { path: '/about', name: 'About' },
    { path: '/shop', name: 'Shop' }
]
export const categories = [
    {
        id: 1,
        name: 'Electronics',
        icon: <Zap size={38} className='hover:text-white' />,
        items: [
            { id: 101, name: 'Laptop' },
            { id: 102, name: 'Smartphone' },
            { id: 103, name: 'Headphones' },
            { id: 104, name: 'Smartwatch' },
            { id: 105, name: 'Camera' }
        ]
    },
    {
        id: 2,
        name: 'Clothing',
        icon: <Shirt size={38} className='hover:text-white' />,
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
        icon: <Microwave size={38} className='hover:text-white' />,
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
        icon: <Book size={38} className='hover:text-white' />,
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
        icon: <Dumbbell size={38} className='hover:text-white' />,
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
        icon: <Armchair size={38} className='hover:text-white' />,
        items: []
    },
    {
        id: 7,
        name: 'Foods & Drinks',
        icon: <Ham size={38} className='hover:text-white' />,
        items: [
            { id: 701, name: 'Snacks' },
            { id: 702, name: 'Beverages' },
            { id: 703, name: 'Dairy Products' },
            { id: 704, name: 'Frozen Foods' }
        ]
    },
    {
        id: 8,
        name: 'Beauty & Personal Care',
        icon: <Sparkles size={38} className='hover:text-white' />,
        items: [
            { id: 801, name: 'Skincare' },
            { id: 802, name: 'Makeup' },
            { id: 803, name: 'Haircare' },
            { id: 804, name: 'Fragrances' }
        ]
    }
];


export const status = ['In Stock', 'On Sale']

export const brands = [
    { name: 'Nike', productCount: 120 },
    { name: 'Apple', productCount: 85 },
    { name: 'Samsung', productCount: 95 },
    { name: 'Adidas', productCount: 110 },
    { name: 'Sony', productCount: 70 },
    { name: 'LG', productCount: 60 }
]
