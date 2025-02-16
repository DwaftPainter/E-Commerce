import { cn } from '@/lib/utils'
import { Slider } from '@mui/material'
import React from 'react'

interface Props {
    priceValue: number[]
    setPriceValue: React.Dispatch<React.SetStateAction<number[]>>
    setFilter: React.Dispatch<React.SetStateAction<boolean>>
    className?: string
}
const SliderFilter = ({ className, priceValue, setPriceValue, setFilter }: Props) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceValue(newValue as number[])
    }

    return (
        <div className={cn('w-full', className)}>
            <div className='w-full px-1.5'>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={priceValue}
                    step={1}
                    scale={value => value * 10}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                    size='small'
                    sx={{
                        height: '3px',
                        color: '#202435',
                        'MuiSlider-root': {}
                    }}
                />
            </div>
            <div className='flex items-center justify-between'>
                <div className='text-[12px] text-gray-400'>
                    Price:
                    <span className='font-semibold text-text2 ml-1'>${priceValue[0] * 10}</span>
                    {priceValue[0] !== priceValue[1] && (
                        <>
                            {' '}—<span className='font-semibold text-text2'>${priceValue[1] * 10} </span>
                        </>
                    )}
                </div>
                <button className='text-[13px] font-semibold' onClick={() => setFilter(prev => !prev)}>FILTER</button>
            </div>
        </div>
    )
}

export default SliderFilter
