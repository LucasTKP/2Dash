'use client'

import React, { useState, createContext } from "react"

export const priceContext = createContext<{
    price: string;
    setPrice: React.Dispatch<React.SetStateAction<string>>
}>({price: 'mensal', setPrice: () => {}})

export function PriceContext({children}: {children: React.ReactNode}) {
    const [price, setPrice] = useState('mensal')

    return (
        <priceContext.Provider value={{price, setPrice}}>
            {children}
        </priceContext.Provider>
    )
}