import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const SideBar = () => {
    const categories = [
        { name: "Woman’s Fashion", items: "Dress" },
        { name: "Men’s Fashion" , items: "Vest"},
        { name: "Electronics" },
        { name: "Home & Lifestyle" },
        { name: "Medicine" },
        { name: "Sports & Outdoor" },
        { name: "Baby’s & Toys" },
        { name: "Groceries & Pets" },
        { name: "Health & Beauty" }
    ];

    return (
        <div className="pt-[44px] pr-[26px] w-[251px]">
            <NavigationMenu className="p-0">
                <NavigationMenuList className="flex flex-col gap-[28px] items-start">
                    {categories.filter(e => e.items).map((e, index) => (
                        <NavigationMenuItem key={index} className="!m-0 w-fit" value={index.toString()}>
                            <NavigationMenuTrigger className="p-0 text-[16px] font-normal h-fit">{e.name}</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex flex-col gap-[28px] mt-[24px]">
              {
                categories.filter(e => !e.items).map((e, index) => (
                  <div className="cursor-pointer" key={index}>
                    <p>{e.name}</p>
                  </div>
                ))
              }
            </div>
        </div>
    );
};

export default SideBar;
