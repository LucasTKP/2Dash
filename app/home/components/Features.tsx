import React from 'react'
import Image from 'next/image'
import ArrowRight from '@/public/Home/arrowRight.svg'
import Events from '@/public/Home/events.webp'
import ShareLinkScreen from '@/public/Home/ShareLinkScreen.webp'
import UserPortalScreen from '@/public/Home/UserPortalScreen.webp'

function Functionalities() {
    const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus iaculis neque, ut mollis ante tristique a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin accumsan dictum hendrerit. Vivamus egestas risus urna, at pharetra lacus vehicula a. Aliquam erat volutpat. Sed vitae interdum quam."
    return (
        <section id="funcionalidades" className="pt-[80px] max-lg:pt-[60px] max-md:pt-[40px] bg-[#ebebeb]">
            <div className="flex container items-center justify-between gap-x-[150px] max-2xl:gap-x-[120px] max-xl:gap-x-[80px] max-lg:flex-col">
                <Image src={Events} alt="Tela mostrando a área de eventos no aplicativo." className="max-xl:w-[40%] max-xl:h-[30%] ml-5 max-lg:hidden" />
                <div className='lg:text-right flex flex-col lg:items-end items-center'>
                    <h1 className="text-[#005532] text-[50px] max-2xl:text-[45px] max-lg:text-[40px] max-md:text-[35px] max-xs:text-[30px] font-jost max-w-[1000px]">Eventos</h1>
                    <h3 className="font-light text-[#555555] text-dynamic_md max-w-[700px] mt-[24px]">
                        O <span className="text-emerald-500 font-medium">2Docs</span> oferece uma funcionalidade avançada de gerenciamento de eventos de upload de arquivos, projetada para simplificar a comunicação entre contadores e clientes, tornando a gestão de documentos contábeis mais eficiente e organizada do que nunca.<br /><br />
                        Utilizando dos eventos, você pode estabelecer datas de entrega limite e de disponibilidade de upload, além da presença de um calendário de eventos intuitivo.
                    </h3>
                    <button className={`max-lg:hidden mt-[36px] flex items-center bg-emerald-500 pl-[12px] pr-[20px] py-[11px] rounded-[16px] duration-100 hover:bg-emerald-600`}>
                        <Image src={ArrowRight} alt="seta" className='rotate-180'/>

                        <a href="#price" className="ml-[8px] font-medium text-[22px] max-lg:text-[18px] whitespace-nowrap">
                            Comece agora
                        </a>
                    </button>
                </div>
                <div className='lg:hidden flex max-sm:flex-col items-end max-sm:items-start w-full mt-[30px] justify-between'>
                    <Image src={Events} alt="Tela mostrando a área de eventos no aplicativo." className='w-[60%] max-sm:w-[90%]' />

                    <button className={`mt-[20px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
                        <a href="#price" className="font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                            Comece agora
                        </a>
                        <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                    </button>
                </div>
            </div>
            <div className="container w-full h-[2px] my-[50px] bg-gradient-to-r from-[#ebebeb] via-emerald-500 to-[#ebebeb]" />

            <div className="flex container items-center justify-between gap-x-[150px] max-2xl:gap-x-[120px] max-xl:gap-x-[80px] max-lg:flex-col">
                <Image src={ShareLinkScreen} alt="Tela mostrando a funcionalidade de compartilhamento de links de download" className="max-xl:w-[40%] max-xl:h-[30%] ml-5 max-lg:hidden" />
                <div className='lg:text-right flex flex-col lg:items-end items-center'>
                    <h1 className="text-[#005532] text-[50px] max-2xl:text-[45px] max-lg:text-[40px] max-md:text-[35px] max-xs:text-[30px] font-jost max-w-[1000px]">Compartilhamento de Link de Download</h1>
                    <h3 className="font-light text-[#555555] text-dynamic_md max-w-[700px] mt-[24px]">
                        Com a funcionalidade de geração de links de compartilhamento arquivos no <span className="text-emerald-500 font-medium">2Docs</span> você simplifica o processo de compartilhar documentos e recursos com facilidade.<br /><br />
                        Compartilhe arquivos já armazenados na plataforma com outros funcionários e clientes de maneira conveniente e segura.
                    </h3>
                    <button className={`max-lg:hidden mt-[36px] flex items-center bg-emerald-500 pl-[12px] pr-[20px] py-[11px] rounded-[16px] duration-100 hover:bg-emerald-600`}>
                        <Image src={ArrowRight} alt="seta" className='rotate-180'/>

                        <a href="#price" className="ml-[8px] font-medium text-[22px] max-lg:text-[18px] whitespace-nowrap">
                            Comece agora
                        </a>
                    </button>
                </div>
                <div className='lg:hidden flex max-sm:flex-col items-end max-sm:items-start w-full mt-[30px] justify-between'>
                    <Image src={ShareLinkScreen} alt="Tela mostrando a funcionalidade de compartilhamento de links de download" className='w-[60%] max-sm:w-[90%]' />

                    <button className={`mt-[20px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
                        <a href="#price" className="font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                            Comece agora
                        </a>
                        <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                    </button>
                </div>
            </div>
            <div className="w-full h-[2px] my-[50px] bg-gradient-to-r from-[#ebebeb] via-emerald-500 to-[#ebebeb]" />

            <div className="flex container items-center justify-between gap-x-[150px] max-2xl:gap-x-[120px] max-xl:gap-x-[80px] max-lg:flex-col">
                <Image src={UserPortalScreen} alt="Tela mostrando a funcionalidade do portal do cliente" className="max-xl:w-[40%] max-xl:h-[30%] ml-5 max-lg:hidden" />
                <div className='lg:text-right flex flex-col lg:items-end items-center'>
                    <h1 className="text-[#005532] text-[50px] max-2xl:text-[45px] max-lg:text-[40px] max-md:text-[35px] max-xs:text-[30px] font-jost max-w-[1000px]">Portal do Cliente <span className="font-[400] text-[24px] text-[#555555]">⦿ BETA</span></h1>
                    <h3 className="font-light text-[#555555] text-dynamic_md max-w-[700px] mt-[24px]">
                        No Portal do Cliente no <span className="text-emerald-500 font-medium">2Docs</span>, você garante satisfação e, proporciona ao seu cliente uma experiência integrada e completa.<br /><br />
                        Dentro do portal, você encontra um local único para a requisição de serviços extras, um importador e emissor de notas fiscais, e um gerador de documentos.
                    </h3>
                    <button className={`max-lg:hidden mt-[36px] flex items-center bg-emerald-500 pl-[12px] pr-[20px] py-[11px] rounded-[16px] duration-100 hover:bg-emerald-600`}>
                        <Image src={ArrowRight} alt="seta" className='rotate-180'/>

                        <a href="#price" className="ml-[8px] font-medium text-[22px] max-lg:text-[18px] whitespace-nowrap">
                            Comece agora
                        </a>
                    </button>
                </div>
                <div className='lg:hidden flex max-sm:flex-col items-end max-sm:items-start w-full mt-[30px] justify-between'>
                    <Image src={UserPortalScreen} alt="Tela mostrando a funcionalidade do portal do cliente" className='w-[60%] max-sm:w-[90%]' />

                    <button className={`mt-[20px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
                        <a href="#price" className="font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                            Comece agora
                        </a>
                        <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Functionalities