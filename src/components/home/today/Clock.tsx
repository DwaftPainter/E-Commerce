'use client'

import React from 'react'
import { calculateTimeLeft } from '@/utils/calculateTimeLeft'
import { Label } from '@/components/ui/label'

interface CountdownProps {
    startDate: Date
    endDate: Date
}

export interface TimeLeft {
    type: "start" | "end";
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

const CountdownClock = ({ startDate, endDate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(calculateTimeLeft(startDate, endDate));

    React.useEffect(() => {
        const timer = setInterval(() =>{
            setTimeLeft(calculateTimeLeft(startDate, endDate));
        }, 1000)

        return () => clearInterval(timer);
    }, [startDate, endDate])

    return (
        <div className='flex items-end sm:gap-[20px] gap-2' suppressHydrationWarning>
            <div className='flex flex-col sm:items-start items-center'>
                <Label className='text-[12px] font-medium' htmlFor='day'>
                    Day
                </Label>
                <h1 suppressHydrationWarning className='sm:text-[32px] font-bold' id='day'>
                    {timeLeft?.days.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='sm:pb-[4px] pb-[2px] sm:text-[32px] text-hover2'>:</span>
            <div className='flex flex-col items-center'>
                <Label className='text-[12px] font-medium' htmlFor='hour'>
                    Hours
                </Label>
                <h1 suppressHydrationWarning className='sm:text-[32px] font-bold' id='hour'>
                    {timeLeft?.hours.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='sm:pb-[4px] pb-[2px] sm:text-[32px] text-hover2'>:</span>
            <div className='flex flex-col items-center'>
                <Label className='text-[12px] font-medium' htmlFor='Minute'>
                    Minutes
                </Label>
                <h1 suppressHydrationWarning className='sm:text-[32px] font-bold' id='minute'>
                    {timeLeft?.minutes.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='sm:pb-[4px] pb-[2px] sm:text-[32px] text-hover2'>:</span>
            <div className='flex flex-col items-center'>
                <Label className='text-[12px] font-medium' htmlFor='second'>
                    Seconds
                </Label>
                <h1 suppressHydrationWarning className='sm:text-[32px] font-bold' id='second'>
                    {timeLeft?.seconds.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
        </div>
    )
}

export default CountdownClock
