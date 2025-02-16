import React from 'react'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { useShopContext } from '@/context/ShopConntext'

interface Props {
    displayMode: string
    setDisplayMode: React.Dispatch<React.SetStateAction<DisplayType>>
    sortType: SortType
    setSortType: React.Dispatch<React.SetStateAction<SortType>>
    className?: string
}

type SortType = 'popularity' | 'rating' | 'latest' | 'asc' | 'desc'
type DisplayType = 'list-view' | 'compact-grid' | 'standard-grid' | 'dense-grid'
const sortLabels: Record<SortType, string> = {
    popularity: 'Sort by popularity',
    rating: 'Sort by average rating',
    latest: 'Sort by latest',
    asc: 'Sort by price: low to high',
    desc: 'Sort by price: high to low'
}

const SortBar = ({ displayMode, setDisplayMode, setSortType, sortType, className }: Props) => {
    const { quantity, setQuantity } = useShopContext()
    const handleModeChange = (value: DisplayType) => {
        if (value) {
            console.log("Running")
            setDisplayMode(value)
        }
    }

    return (
        <div className={cn('w-full min-h-3.5 px-[1.875rem] py-3 bg-secondary rounded-sm flex items-center justify-between', className)}>
            <div className='flex gap-5'>
                <ToggleGroup
                    type='single'
                    value={displayMode}
                    onValueChange={(value: DisplayType) => handleModeChange(value)}
                >
                    <ToggleGroupItem
                        className='opacity-20 data-[state=on]:opacity-100 hover:opacity-100'
                        value='list-view'
                        aria-label='Toggle bold'
                    >
                        <img src='assets/images/menu.png' alt='' className='h-3.5 w-3.5' />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        className='opacity-20 data-[state=on]:opacity-100 hover:opacity-100'
                        value='compact-grid'
                        aria-label='Toggle italic'
                    >
                        <img src='assets/images/2stgrid.png' alt='' className='h-3.5 w-3.5' />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        className='opacity-20 data-[state=on]:opacity-100 hover:opacity-100'
                        value='standard-grid'
                        aria-label='Toggle strikethrough'
                    >
                        <img src='assets/images/3thgrid.png' alt='' className='h-3.5 w-3.5' />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        className='opacity-20 data-[state=on]:opacity-100 hover:opacity-100'
                        value='dense-grid'
                        aria-label='Toggle strikethrough'
                    >
                        <img src='assets/images/4thgrid.png' alt='' className='h-3.5 w-3.5' />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='flex gap-4 h-full'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='focus-visible:outline-none'>
                        <button className='flex justify-start items-center text-[12px] font-semibold'>
                            <ArrowUpDown className='mr-2 h-4 w-4' />
                            {sortLabels[sortType]}
                            <ChevronDown className='ml-3 h-4 w-4' />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[220px]'>
                        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={sortType}
                            onValueChange={value => setSortType(value as SortType)}
                        >
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='popularity'
                            >
                                Sort by popularity
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='rating'
                            >
                                Sort by average rating
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='latest'
                            >
                                Sort by latest
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='low'
                            >
                                Sort by price: low to high
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='high'
                            >
                                Sort by latest: high to low
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation='vertical' className='h-full' />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='focus-visible:outline-none'>
                        <button className='flex justify-start items-center text-[12px]'>
                            Show: <span className='text-[13px] font-semibold ml-1'>{quantity}</span>
                            <ChevronDown className='ml-3 h-4 w-4' />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56'>
                        <DropdownMenuLabel>Choose an Item Number</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={quantity} onValueChange={setQuantity}>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='6'
                            >
                                6
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='12'
                            >
                                12
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='18'
                            >
                                18
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                className='focus:text-hover2 data-[state=checked]:text-secondary2'
                                value='24'
                            >
                                24
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default SortBar
