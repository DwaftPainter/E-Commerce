'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
interface bannerProps {
    items?: string[],
    interval?: number,
    className?: string
}

 function Banner({ items, interval, className } : bannerProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: interval, stopOnInteraction: false })
  )

  const onSelect = React.useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    api.on("select", onSelect)
    api.on("reInit", onSelect)
  }, [api, onSelect])

  return (
    <div className={cn(className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-full pl-[44px] pt-[44px] flex justify-center relative"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {items?.map((banner, index) => (
            <CarouselItem key={index}>
              <div>
                  <CardContent className="w-full h-[420px] p-0">
                    <img src={banner} className="w-full h-full object-cover"/>
                  </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-2 mt-4 absolute bottom-[25px] z-100">
        {items?.map((_, index) => (
          <div
            key={index}
            className={`w-[14px] h-[14px] rounded-full border-[2px] border-white
              ${index === current ? "bg-secondary2" : "bg-white opacity-50"}`}
          ></div>
        ))}
      </div>
      </Carousel>
    </div>
  )
}

export default Banner