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

const SaleClock = ({ startDate, endDate }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(calculateTimeLeft(startDate, endDate));

    React.useEffect(() => {
        const timer = setInterval(() =>{
            setTimeLeft(calculateTimeLeft(startDate, endDate));
        }, 1000)

        return () => clearInterval(timer);
    }, [startDate, endDate])

    return (
        <div className='flex items-end gap-[20px]' suppressHydrationWarning>
            <div className='bg-primary flex flex-col justify-center items-center rounded-full h-16 w-16'>
                <h1 suppressHydrationWarning className='font-semibold' id='day'>
                    {timeLeft?.days.toString().padStart(2, "0") || "00"}
                </h1>
                <Label className='text-[11px]' htmlFor='day'>
                    Day
                </Label>
            </div>
            <div className='bg-primary flex flex-col justify-center items-center rounded-full h-16 w-16'>
                <h1 suppressHydrationWarning className='font-semibold' id='hour'>
                    {timeLeft?.hours.toString().padStart(2, "0") || "00"}
                </h1>
                <Label className='text-[11px] font-medium' htmlFor='hour'>
                    Hours
                </Label>
            </div>
            <div className='bg-primary flex flex-col justify-center items-center rounded-full h-16 w-16'>
                <h1 suppressHydrationWarning className='font-semibold' id='minute'>
                    {timeLeft?.minutes.toString().padStart(2, "0") || "00"}
                </h1>
                <Label className='text-[11px]' htmlFor='Minute'>
                    Minutes
                </Label>
            </div>
            <div className='bg-primary flex flex-col justify-center items-center rounded-full h-16 w-16'>
                <h1 suppressHydrationWarning className='font-semibold' id='second'>
                    {timeLeft?.seconds.toString().padStart(2, "0") || "00"}
                </h1>
                <Label className='text-[11px]' htmlFor='second'>
                    Seconds
                </Label>
            </div>
        </div>
    )
}

export default SaleClock
