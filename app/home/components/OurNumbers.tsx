import React from 'react'

function OurNumbers() {
    return (
        <section className='bg-[#ebebeb] pt-[100px]'>
            <div className='bg-emerald-500/10'>
                <div className='font-medium flex items-start justify-between py-[40px] px-[15%] max-xl:px-[10%] max-lg:px-[1%] text-center gap-x-[20px]'>
                    <div>
                        <p className='text-[64px] max-2xl:text-[60px] max-xl:text-[55px] max-lg:text-[45px] max-md:text-[40px] max-sm:text-[35px] max-xs:text-[25px] text-emerald-500'>+4,5 mil</p>
                        <p className='text-[24px] max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px] max-xs:text-[14px] text-[#5D5D5D]'>arquivos gerenciados</p>
                    </div>

                    <div>
                        <p className='text-[64px] max-2xl:text-[60px] max-xl:text-[55px] max-lg:text-[45px] max-md:text-[40px] max-sm:text-[35px] max-xs:text-[25px] text-emerald-500'>+200</p>
                        <p className='text-[24px] max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px] max-xs:text-[14px] text-[#5D5D5D]'>usuários ativos</p>
                    </div>

                    <div>
                        <p className='text-[64px] max-2xl:text-[60px] max-xl:text-[55px] max-lg:text-[45px] max-md:text-[40px] max-sm:text-[35px] max-xs:text-[25px] text-emerald-500'>+1 ano</p>
                        <p className='text-[24px] max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px] max-xs:text-[14px] text-[#5D5D5D]'>no mercado de <br /> soluções contabeis</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurNumbers