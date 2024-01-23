import React from 'react'
import Image from 'next/image'
import ArrowRight from '@/public/Home/arrowRight.svg'
import TwoDocsDesktop from '@/public/Home/2DocsDesktop.webp'
import TwoDocsMobile from '@/public/Home/2DocsMobile.webp'

function ShowMobileAndDesktop() {
    return (
        <section id="funcionalidades" className="flex justify-between py-[80px] max-lg:pt-[60px] max-md:pt-[40px] bg-[#ebebeb]">
            <div className="flex container items-center justify-between gap-x-[80px] max-lg:flex-col">

                <div className='flex flex-col items-start'>
                    <h1 className="text-[#005532] text-[50px] max-2xl:text-[45px] max-lg:text-[40px] max-md:text-[35px] max-xs:text-[30px] font-jost max-w-[1000px]">Decidido a implementar o diferencial na sua empresa?</h1>
                    <h3 className="font-light text-[#555555] text-dynamic_md max-w-[700px] mt-[24px]">
                        Com o <span className="text-emerald-500 font-medium">2Docs</span> você tem a oportunidade de se destacar no mercado e trazer uma experiência totalmente nova para seus clientes.
                    </h3>
                    <button className={`max-lg:hidden mt-[36px] flex items-center bg-emerald-500 pl-[12px] pr-[20px] py-[11px] rounded-[16px] duration-100 hover:bg-emerald-600`}>
                        <a href="#price" className="font-medium text-[22px] max-lg:text-[18px] whitespace-nowrap">
                            Comece agora
                        </a>
                        <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                    </button>
                </div>

                <div className='mt-[30px] flex items-center lg:hidden'>
                    <Image src={TwoDocsMobile} quality={100} alt="Dashboard 2docs" className="w-[30%] mr-[-30px] z-10"/>
                    <Image src={TwoDocsDesktop} quality={100} alt="Dashboard 2docs" className="w-[70%]"/>
                </div>

                <button className={`lg:hidden self-start mt-[36px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
                    <a href="#price" className="font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                        Comece agora
                    </a>
                    <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                </button>

            </div>


            <div className='w-full flex justify-end items-center max-lg:hidden'>
                <Image src={TwoDocsMobile} alt="Dashboard 2docs" className="w-[30%] mr-[-30px] z-10" />
                <Image src={TwoDocsDesktop} alt="Dashboard 2docs" className="w-[70%]" />
            </div>
        </section>
    )
}



export default ShowMobileAndDesktop