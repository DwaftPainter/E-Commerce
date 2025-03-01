'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { categories, NAV_LINKS } from '@/utils/constants'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '../ui/button'

interface Props {
    className?: string
}
const MobileMenu = ({ className }: Props) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Drawer direction='left' open={open}>
            <DrawerTrigger asChild className='lg:hidden block' onClick={() => setOpen(prev => !prev)}>
                <Menu />
            </DrawerTrigger>
            <DrawerContent className='h-full md:max-w-md rounded-none overflow-scroll'>
                <div className='overflow-scroll w-full'>
                    <div className='w-full h-fit'>
                        <DrawerHeader className='flex justify-between items-center w-full'>
                            <DrawerTitle className='text-2xl font-bold'>
                                <span className='text-secondary2'>Neo</span> Store
                            </DrawerTitle>
                            <DrawerClose
                                className='bg-secondary2 h-5 w-5 bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer'
                                onClick={() => setOpen(prev => !prev)}
                            >
                                <X size={16} color={'white'} />
                            </DrawerClose>
                        </DrawerHeader>
                    </div>
                    <SidebarProvider className='min-h-fit w-full'>
                        <SidebarMenu>
                            <Collapsible className='px-4 my-4'>
                                <CollapsibleTrigger asChild className='w-full flex items-center'>
                                    <Button className='bg-secondary2 hover:bg-hover2 rounded-sm flex justify-between items-center h-[50px]'>
                                        <Menu />
                                        <p>All Categories</p>
                                        <ChevronDown />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {categories.map(item => (
                                        <Collapsible key={item.name} asChild className='group/collapsible'>
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton tooltip={item.name} className='mt-4'>
                                                        <Link
                                                            onClick={() => setOpen(false)}
                                                            href={`shop?filter_cat=${
                                                                categories.find(
                                                                    category => category.name === item.name
                                                                )?.id
                                                            }`}
                                                            className='flex items-center gap-2'
                                                        >
                                                            {item.smallIcon}
                                                            {item.name}
                                                        </Link>
                                                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items?.map(subItem => (
                                                            <SidebarMenuSubItem key={subItem.name}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <Link
                                                                        onClick={() => setOpen(false)}
                                                                        href={`shop?filter_cat=${
                                                                            categories
                                                                                .find(
                                                                                    category =>
                                                                                        category.name ===
                                                                                        item.name
                                                                                )
                                                                                ?.items.find(
                                                                                    e =>
                                                                                        e.name ===
                                                                                        subItem.name
                                                                                )?.id
                                                                        }`}
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarProvider>
                    <div>
                        <h1 className='text-sm opacity-55 p-4 font-semibold'>Site Navigation</h1>
                        <nav className='flex flex-col'>
                            {NAV_LINKS.map((link, index) => (
                                <Link
                                    href={link.path}
                                    key={link.path}
                                    className='cursor-pointer'
                                    onClick={() => setOpen(false)}
                                >
                                    <div
                                        className={`border-b ${
                                            index === 0 ? 'border-t' : ''
                                        } px-4 min-h-[50px] flex items-center text-sm font-semibold`}
                                    >
                                        {link.name}
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileMenu
