'use client'

import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbProps {
    className?: string
}

const Breadcrumbs = ({ className }: BreadcrumbProps) => {
    const paths = usePathname().split('/').filter(Boolean)

    if (paths.length === 0) {
        return null
    }

    if (paths.find(path => path === 'sign-in' ||  path === 'sign-up')) {
        return null
    }

    return (
        <div
            className={cn(
                'lg:mb-[80px] mb-10 sm:mt-56 2xl:ml-[200px] xl:ml-16 md:ml-10 ml-4',
                className
            )}
        >
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
                                <BreadcrumbLink
                                    href={
                                        part == 'product'
                                            ? '/shop'
                                            : paths[index - 1] == 'product'
                                            ? '#'
                                            : `/${part}`
                                    }
                                    className={`${index === paths.length - 1 && 'text-text2'} ${
                                        paths[index - 1] == 'product' && 'text-[#9B9BB4] hover:text-[#9B9BB4]'
                                    }`}
                                >
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
