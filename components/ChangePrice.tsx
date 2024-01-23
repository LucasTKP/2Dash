'use client'

import { useContext } from "react"
import { priceContext } from "./PriceContext"
import * as Switch from '@radix-ui/react-switch';
import Image from "next/image";
import AnualIcon from '@/public/Home/anual.svg'

export function ChangePrice() {
    const {price, setPrice} = useContext(priceContext)

    return (
        <div className="relative mb-20 ">
            <Switch.Root
            onCheckedChange={(e) => {
                setPrice(e ? 'anual' : 'mensal')
            }}
            className="shadow-[rgba(106,106,106,0.3)] w-[280px] h-[70px] rounded-xl relative flex items-center  shadow-[0_0_10px_0] focus:shadow-[0_0_0_2px] focus:shadow-emerald-500 data-[state=checked]:bg-emerald-500/40 outline-none cursor-default"
            id="airplane-mode"
            style={{ 'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)' }}
            >
                <Switch.Thumb className="absolute z-10 w-[48%] h-[80%] left-1 bg-emerald-500 rounded-lg transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[100%]" />
                <div className="w-full flex gap-[82px] px-6 z-20 justify-center text-center">
                    <p className={`text-[18px] font-medium ${price === "mensal" ? "" : "text-[#555555]"}`}>Mensal</p>
                    <p className={`text-[18px] font-medium ${price === "anual" ? "" : "text-[#555555]"}`}>Anual</p>
                </div>
            </Switch.Root>
            <Image src={AnualIcon} alt="Desconto de 30% no plano anual" className="absolute right-[-130px] top-10 max-sm:right-[-50px] max-sm:top-[80px] max-sm:w-[100px] max-xs:right-[-40px]"></Image>
        </div>
        
    )
}