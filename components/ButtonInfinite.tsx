'use client'
import React, { useEffect, useRef } from 'react';

function ButtonInfinite() {
    const refTextButton = useRef<HTMLParagraphElement>(null);
    const refDivBackgroundAnimation = useRef<HTMLDivElement>(null)
    const textsButton = ['Integrado', 'Customizado', 'Seguro', 'Rápido']
    var number = 0
    useEffect(() => {
        refDivBackgroundAnimation.current?.classList.add('animate-backgroundanimation')
        setInterval(() => {

            if (refTextButton.current) {
                const textElement = refTextButton.current;
                if (number + 1 === textsButton.length) {
                    textElement.innerText = textsButton[0];
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    number = 0
                } else {
                    textElement.innerText = textsButton[number + 1];
                    number = number + 1
                }
    
            }
        }, 3000);
    }, [])
   

    return (
        <button className="group relative ml-[20px] max-2xl:ml-[15px] max-xl:ml-[10px] max-lg:ml-[5px] rounded-[18px] 
        max-xl:rounded-[14px] max-lg:rounded-[10px] max-sm:rounded-[6px] px-[40px] max-2xl:px-[30px] max-xl:px-[25px] max-lg:px-[15px]
        before:w-full before:h-full before:top-[12px] before:left-[12px] before:z-[-3] before:rounded-[18px]  
        max-xl:before:rounded-[14px] max-lg:before:rounded-[10px] max-sm:before:rounded-[6px]  before:border-[3px] before:border-emerald-500 before:block before:absolute
        ">
            <div ref={refDivBackgroundAnimation} className="z-[-1] absolute h-full bg-emerald-500/20 rounded-[18px] max-xl:rounded-[14px] max-lg:rounded-[10px] max-sm:rounded-[6px] left-0" />
            <div className="z-[-2] absolute w-full h-full bg-[#282828] rounded-[18px] max-xl:rounded-[14px] max-lg:rounded-[10px] max-sm:rounded-[6px] left-0 outline-[3px] outline" />
            <p ref={refTextButton} className="text-[60px] max-2xl:text-[45px] max-xl:text-[40px] max-lg:text-[30px] max-md:text-[25px] 
            max-xs:text-[23px] bg-clip-text bg-gradient-to-r from-emerald-500 to-white text-transparent">Integrado</p>
        </button>
    );
}

export default ButtonInfinite;
