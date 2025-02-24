'use client'

import { Star } from 'lucide-react'
import React from 'react'

interface StarProps {
    totalStars: number
    initialRating: number | 5
    onChange?: (rating: number) => void
    readOnly?: boolean
    review: number | 0
}

const StarRating = ({ totalStars, initialRating, onChange, readOnly, review }: StarProps) => {
    const [rating, setRating] = React.useState(initialRating);
    const [hover, setHover] = React.useState(0);

    const handleClick = (selectedRating: number) => {
        if (!readOnly) {
            setRating(selectedRating)
            onChange?.(selectedRating)
        }
    }

    const handleMouseEnter = (starIndex: number) => {
        if (!readOnly) {
            setHover(starIndex)
        }
    }

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHover(0)
        }
    }

    return (
        <div className='flex items-center gap-[8px]' role='radiogroup'>
            <div className='h-fit flex items-center'>
                {Array.from({ length: totalStars }).map((_, index) => {
                    const starValue = index + 1

                    return (
                        <button
                            key={index}
                            className={`pr-[5px] ${readOnly ? 'cursor-default' : 'cursor-pointer'} `}
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={handleMouseLeave}
                            onFocus={() => handleMouseEnter(starValue)}
                            onBlur={handleMouseLeave}
                            aria-checked={starValue <= rating}
                            aria-posinset={starValue}
                            aria-setsize={totalStars}
                            role="radio"
                            tabIndex={readOnly ? -1 : 0}
                        >
                            <Star size={16} className={`${starValue <= (hover || rating) ? "text-[#FFAD33] fill-[#FFAD33]" : "text-text2 fill-text2 opacity-25"} `} />
                        </button>
                    )
                })}
            </div>
            <span className='text-[14px] opacity-50 font-semibold'>({review})</span>
        </div>
    )
}

export default StarRating
