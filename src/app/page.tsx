'use client'

import BestSeller from "@/components/home/bestseller";
import Carousel from "@/components/home/carousel";
import Categories from "@/components/home/categories";
import Feature from "@/components/home/feature";
import Products from "@/components/home/product";
import Today from "@/components/home/today";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div>
        <Carousel />
        <Today /> 
        <Categories />
        <BestSeller />
        <Products />
        <Feature />
      </div>
      <Button
          className='bg-secondary w-[46px] h-[46px] rounded-full p-0 absolute hidden'
          onClick={() => scrollToTop()}
      >
          <ArrowUp color='black' />
      </Button>
    </>
  );
}
