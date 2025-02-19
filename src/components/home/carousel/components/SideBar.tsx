import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { NavMain } from '@/components/nav-main'
import { ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const SideBar = () => {
    const categories = [
        {
            name: 'Woman’s Fashion',
            items: [
                { title: 'Dress' },
                { title: 'Skirt' },
                { title: 'Blouse' },
                { title: 'Handbag' },
                { title: 'Heels' }
            ]
        },
        {
            name: 'Men’s Fashion',
            items: [
                { title: 'Vest' },
                { title: 'Suit' },
                { title: 'Trousers' },
                { title: 'Sneakers' },
                { title: 'Watch' }
            ]
        },
        { name: 'Electronics' },
        { name: 'Home & Lifestyle' },
        { name: 'Medicine' },
        { name: 'Sports & Outdoor' },
        { name: 'Baby’s & Toys' },
        { name: 'Groceries & Pets' },
        { name: 'Health & Beauty' }
    ]

    const data = categories.map(category => ({
        title: category.name,
        url: '#',
        isActive: false,
        items: category.items ? [{ title: category.items, url: '#' }] : []
    }))

    return (
        <div className=' gap-[26px] w-[300px] flex border-r relative'>
            <div className='flex flex-col gap-7 pt-11 w-full'>
                {categories.map((e, index) => (
                    <div key={index} className='group'>
                        {e.items && e.items.length > 0 ? (
                            <div className='mr-8'>
                                <div className='flex items-center justify-between cursor-pointer hover:text-hover2'>
                                    {e.name}
                                    <ChevronRight size={16} />
                                </div>
                                <div className='absolute top-0 right-0 left-full p-11 bottom-0 w-full border-x border-b bg-white group-hover:flex hidden hover:block z-50 flex-col gap-7'>
                                    {e.items?.map((item, index) => (
                                        <div className='cursor-pointer hover:text-secondary2' key={index}>
                                            <p>{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='cursor-pointer hover:text-secondary2' key={index}>
                                <p>{e.name}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* <NavMain items={data} className="w-full"/> */}
        </div>
    )
}

export default SideBar
