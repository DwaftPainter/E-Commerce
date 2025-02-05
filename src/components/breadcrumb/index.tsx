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

const Breadcrumbs = ({ className } : BreadcrumbProps) => {
    const paths = usePathname().split('/').filter(Boolean)

    if (paths.length === 0) {
        return null;
    }

    return (
        <div className={cn('my-[80px]', className)}>
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
                                <BreadcrumbLink href={`/${part}`} className={`${index === paths.length - 1 && "text-text2"}`}>
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
