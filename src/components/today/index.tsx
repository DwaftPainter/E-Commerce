import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HomeLayout from "@/layouts/HomeLayout"
import { Button } from "../ui/button"
import Product from "../product"

function Today() {
  return (
    <HomeLayout
      title="Today's"
    > 
    
      <h1 className="text-[36px] font-semibold mb-[40px]">Flash Sales</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Product/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-full flex justify-center items-center mt-[65px]">
        <Button className="bg-secondary2 hover:bg-hover2 rounded-[4px] h-[56px] px-[48px] py-[16px] font-medium">
          View All Products
        </Button>
      </div>
    </HomeLayout>
  )
}

export default Today
