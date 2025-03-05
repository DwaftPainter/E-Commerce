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
        icon: <Zap className='hover:text-white h-8 w-8' />,
        smallIcon: <Zap className='hover:text-white h-4 w-4' />,
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
        icon: <Shirt className='hover:text-white h-8 w-8' />,
        smallIcon: <Shirt className='hover:text-white h-4 w-4' />,
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
        icon: <Microwave className='hover:text-white h-8 w-8' />,
        smallIcon: <Microwave className='hover:text-white h-4 w-4' />,
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
        icon: <Book className='hover:text-white h-8 w-8' />,
        smallIcon: <Book className='hover:text-white h-4 w-4' />,
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
        icon: <Dumbbell className='hover:text-white h-8 w-8' />,
        smallIcon: <Dumbbell className='hover:text-white h-4 w-4' />,
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
        icon: <Armchair className='hover:text-white h-8 w-8' />,
        smallIcon: <Armchair className='hover:text-white h-4 w-4' />,
        items: []
    },
    {
        id: 7,
        name: 'Foods & Drinks',
        icon: <Ham className='hover:text-white h-8 w-8' />,
        smallIcon: <Ham className='hover:text-white h-4 w-4' />,
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
        icon: <Sparkles className='hover:text-white h-8 w-8' />,
        smallIcon: <Sparkles className='hover:text-white h-4 w-4' />,
        items: [
            { id: 801, name: 'Skincare' },
            { id: 802, name: 'Makeup' },
            { id: 803, name: 'Haircare' },
            { id: 804, name: 'Fragrances' }
        ]
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

export const leaders = [
    {
        name: 'Tom Hiddleston',
        image: 'https://i.pinimg.com/736x/45/7e/f1/457ef11030ed2fd8d0849694fb5c0df8.jpg', // Replace with actual image URLs
        position: 'Project Manager',
        socials: {
            twitter: 'https://twitter.com/riverwhisperer',
            instagram: 'https://instagram.com/riverwhisperer',
            linkedin: 'https://linkedin.com/in/riverwhisperer'
        }
    },
    {
        name: 'Mountain Sculptor',
        image: 'https://i.pinimg.com/736x/1f/ee/0d/1fee0d787d677c4fa77a3ed418de2f86.jpg', // Replace with actual image URLs
        position: 'Artist',
        socials: {
            twitter: 'https://twitter.com/mountainsculptor',
            instagram: 'https://instagram.com/mountainsculptor',
            linkedin: 'https://linkedin.com/in/mountainsculptor'
        }
    },
    {
        name: 'Sky Dreamer',
        image: 'https://i.pinimg.com/736x/e0/2a/3b/e02a3be82cb40ed11454d52ecb666b69.jpg', // Replace with actual image URLs
        position: 'Designer',
        socials: {
            twitter: 'https://twitter.com/skydreamer',
            instagram: 'https://instagram.com/skydreamer',
            linkedin: 'https://linkedin.com/in/skydreamer'
        }
    },
    {
        name: 'Forest Seeker',
        image: 'https://i.pinimg.com/736x/dc/10/aa/dc10aafc68d384622f59edb3919a924d.jpg', // Replace with actual image URLs
        position: 'Engineer',
        socials: {
            twitter: 'https://twitter.com/forestseeker',
            instagram: 'https://instagram.com/forestseeker',
            linkedin: 'https://linkedin.com/in/forestseeker'
        }
    },
    {
        name: 'Dwarf Painter',
        image: 'https://i.pinimg.com/736x/44/64/8d/44648dc6f8d6ce38a1d13c33405d1265.jpg', // Replace with actual image URLs
        position: 'Developer',
        socials: {
            twitter: 'https://twitter.com/dwarfpainter',
            instagram: 'https://instagram.com/dwarfpainter',
            linkedin: 'https://linkedin.com/in/dwarfpainter'
        }
    }
]

export const banners = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/d37640187956003.65945a92b5465.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/9b914c190090001.65b56b503f67c.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/18032a157499583.637a5ba1685f9.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c3c29f190817739.65c131bd14553.png'
]