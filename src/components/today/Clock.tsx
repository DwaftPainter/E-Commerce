'use client'

import React from 'react'
import { Label } from '../ui/label'
import { calculateTimeLeft } from '@/utils/calculateTimeLeft'

interface CountdownProps {
    startDate: string
    endDate: string
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
        <div className='flex items-end gap-[20px]' suppressHydrationWarning>
            <div>
                <Label className='text-[12px] font-medium' htmlFor='day'>
                    Day
                </Label>
                <h1 suppressHydrationWarning className='text-[32px] font-bold' id='day'>
                    {timeLeft?.days.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='pb-[4px] text-[32px] text-hover2'>:</span>
            <div>
                <Label className='text-[12px] font-medium' htmlFor='hour'>
                    Hours
                </Label>
                <h1 suppressHydrationWarning className='text-[32px] font-bold' id='hour'>
                    {timeLeft?.hours.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='pb-[4px] text-[32px] text-hover2'>:</span>
            <div>
                <Label className='text-[12px] font-medium' htmlFor='Minute'>
                    Minutes
                </Label>
                <h1 suppressHydrationWarning className='text-[32px] font-bold' id='minute'>
                    {timeLeft?.minutes.toString().padStart(2, "0") || "00"}
                </h1>
            </div>
            <span className='pb-[4px] text-[32px] text-hover2'>:</span>
            <div>
                <Label className='text-[12px] font-medium' htmlFor='second'>
                    Seconds
                </Label>
                <h1 suppressHydrationWarning className='text-[32px] font-bold' id='second'>
                    {timeLeft?.seconds.toString().padStart(2, "0")}
                </h1>
            </div>
        </div>
    )
}

export default CountdownClock
