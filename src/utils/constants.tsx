import { Camera, Computer, Gamepad, Ham, Headphones, Shirt, Smartphone, Watch } from 'lucide-react'

export const NAV_LINKS = [
    { path: '/', name: 'Home' },
    { path: '/contact', name: 'Contact' },
    { path: '/about', name: 'About' },
    { path: '#', name: 'Shop' }
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
