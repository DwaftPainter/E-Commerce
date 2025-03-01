import React from 'react'
import AccountForm from '@/app/my-account/components/account-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from './components/orders'

const page = () => {

    return (
        <Tabs defaultValue='account-detail'  orientation='vertical'>
            <TabsList className='mb-10 rounded-sm'>
                <TabsTrigger value='account-detail' className='rounded-sm'>ACCOUNT DETAIL</TabsTrigger>
                <TabsTrigger value='orders' className='rounded-sm'>ORDER</TabsTrigger>
            </TabsList>
            <TabsContent value='account-detail' className='mt-0'>
                <AccountForm />
            </TabsContent>
            <TabsContent value='orders' className='mt-0'>
                <Orders />
            </TabsContent>
        </Tabs>
    )
}

export default page
