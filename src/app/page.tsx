'use client'

import BestSeller from "@/components/bestseller";
import Carousel from "@/components/carousel";
import Categories from "@/components/categories";
import Feature from "@/components/feature";
import Products from "@/components/product";
import Today from "@/components/today";
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
