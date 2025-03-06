import React from 'react'
import { ChevronRight } from 'lucide-react'
import { categories } from '@/utils/constants'
import Link from 'next/link'

const SideBar = () => {
    return (
        <div className=' gap-[26px] w-[300px] lg:flex border border-t-0 rounded-b-sm relative hidden '>
            <div className='flex flex-col gap-7 pt-11 w-full'>
                {categories.map((e, index) => (
                    <div key={index} className='group px-5'>
                        {e.items && e.items.length > 0 ? (
                            <div>
                                <Link
                                    href={`shop?filter_cat=${
                                        categories.find(category => category.name === e.name)?.id
                                    }`}
                                >
                                    <div className='flex items-center justify-between cursor-pointer hover:text-hover2'>
                                        <div className='flex items-center gap-3'>
                                            {e.smallIcon}
                                            {e.name}
                                        </div>
                                        <ChevronRight size={16} />
                                    </div>
                                </Link>
                                <div className='absolute top-0 right-0 left-full p-11 bottom-0 w-full border-x border-b bg-white group-hover:flex hidden hover:block z-50 flex-col gap-7 rounded-b-sm -mb-[1px]'>
                                    {e.items?.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={`shop?filter_cat=${
                                                categories
                                                    .find(category => category.name === e.name)
                                                    ?.items.find(e => e.name === item.name)?.id
                                            }`}
                                        >
                                            <div className='cursor-pointer hover:text-secondary2'>
                                                <p> {item.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='cursor-pointer hover:text-secondary2 flex items-center gap-3' key={index}>
                                {e.smallIcon}
                                <p>{e.name}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar
