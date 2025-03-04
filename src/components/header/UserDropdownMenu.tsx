'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppContext } from '@/context/AppContext'
import { UserType } from '@/types/user.type'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DropdownMenuProps {
    user: UserType | null
}

export default function UserDropdownMenu({ user }: DropdownMenuProps) {
    const { handleLogout } = useAppContext()

    return (
        <DropdownMenu modal={false}>
            {!user ? (
                <Link href='/auth/sign-up'>
                    <User className='cursor-pointer' />
                </Link>
            ) : (
                <DropdownMenuTrigger
                    asChild
                    className='data-[state=open]:bg-secondary2 data-[state=open]:h-6 data-[state=open]:w-6 flex items-center justify-center rounded-full data-[state=open]:text-white text-[10px]'
                >
                    <User className='cursor-pointer' />
                </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className='w-56' sideOffset={8}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href='/my-account'>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        Orders
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
