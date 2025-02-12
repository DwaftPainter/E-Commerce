import AccountForm from '@/components/account/account-form'
import { NavMain } from '@/components/nav-main'
import React from 'react'

const page = () => {
    const navMain = [
        {
            title: 'Manage My Account',
            url: '#',
            isActive: true,
            items: [
                {
                    title: 'My Profile',
                    url: '#'
                },
                {
                    title: 'Address Book',
                    url: '#'
                },
                {
                    title: 'My Payment Options',
                    url: '#'
                }
            ]
        },
        {
            title: 'My Orders',
            url: '#',
            isActive: true,
            items: [
                {
                    title: 'My Returns',
                    url: '#'
                },
                {
                    title: 'My Cancellations',
                    url: '#'
                }
            ]
        },
        {
            title: 'My Wishlists',
            url: '#',
            isActive: true
        }
    ]

    return (
        <div className='flex gap-36'>
            <NavMain items={navMain} className='w-[20%]'/>
            <AccountForm/>
        </div>
    )
}

export default page
