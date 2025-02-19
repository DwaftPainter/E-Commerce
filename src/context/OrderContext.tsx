"use client";

import { ProductType } from "@/types/product.type";
import React from "react";

type ItemsType = {
    product: ProductType;
    quantity: number;
};

interface OrderContextType {
    items: ItemsType[] | null;
    setItems: React.Dispatch<React.SetStateAction<ItemsType[] | null>>;
}

const OrderContext = React.createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = React.useState<ItemsType[] | null>(null);

    return <OrderContext.Provider value={{ items, setItems }}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
    const context = React.useContext(OrderContext);
    if (!context) {
        throw new Error("useAppContext can not be used outside <AppProvider>");
    }
    return context;
};
