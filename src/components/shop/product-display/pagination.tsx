import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useShopContext } from '@/context/ShopConntext'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

interface Props {
    className?: string
}

export default function ShopPagination({ className }: Props) {
    const { totalPages } = useShopContext()
    const searchParams = useSearchParams()

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        return `/shop/?${params.toString()}`
    }

    return (
        <Pagination className={cn(className)}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageUrl(Number(searchParams.get('page')) - 1)}
                        disabled={(Number(searchParams.get('page')) || 1) === 1}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages })?.map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href={createPageUrl(index + 1)}
                            isActive={(Number(searchParams.get('page')) || 1) == index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href={createPageUrl((Number(searchParams.get('page')) || 1) + 1)}
                        disabled={Number(searchParams.get('page')) === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
