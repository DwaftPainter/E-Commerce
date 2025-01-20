'use client'

import { TimeLeft } from "@/components/today/Clock";

export function calculateTimeLeft(start: string, end: string): TimeLeft | null  {
    const currentTime = new Date().getTime();
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    if (currentTime < startTime) {
        const difference = startTime - currentTime;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(difference / (1000 * 60) % 60);
        const seconds = Math.floor(difference / (1000) % 60);

        return {type: "start", days, hours, minutes, seconds};
    } else if (currentTime < endTime) {
        const difference = endTime - currentTime;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(difference / (1000 * 60) % 60);
        const seconds = Math.floor(difference / (1000) % 60);

        return {type: "end", days, hours, minutes, seconds};
    }

    return null;    
}