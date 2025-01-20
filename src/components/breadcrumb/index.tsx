'use client'

import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Slash } from 'lucide-react'

const Breadcrumbs = () => {
    const paths = usePathname().split('/').filter(Boolean)

    if (paths.length === 0) {
        return null;
    }

    return (
        <div className='mt-[80px] ml-[135px]'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    {paths.map((part, index) => (
                        <div
                            key={index}
                            className='flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5'
                        >
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${part}`}>
                                    {part.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index != paths.length - 1 ? (
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
