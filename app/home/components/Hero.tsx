import Image from "next/image"
import Woman from '@/public/Home/Woman.webp'
import ArrowRight from '@/public/Home/arrowRight.svg'

function Hero() {
  return (
    <section className="pt-[92px] bg-[#ebebeb]">
      <div className="flex">
        <div className="container pl-[60px] my-[54px]">
          <div>
            <h1 className="text-[#005532] text-[70px] max-2xl:text-[65px] max-lg:text-[45px] max-md:text-[40px] max-xs:text-[35px] font-jost max-w-[1000px] sm:mr-[20px]">Proporcione o  <br /> melhor para seus <br />clientes. </h1>
            <h3 className="font-light text-dynamic_md max-w-[700px] mt-[24px] text-[#555555] mr-[20px]">
              <span className="font-medium">Transforme a maneira em que você lida com seus documentos contábeis.</span><br />
              O <span className="text-emerald-500 font-medium">2Docs</span> é a sua solução completa para uma gestão de documentos mais eficaz e uma comunicação transparente com seus clientes.<br /><br />

              Não perca tempo e teste gratuitamente,<br />
              <span className="text-emerald-500 font-medium">o dia de mudança é hoje!</span>
            </h3>
            <button className={`mb-[15px] mt-[50px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
              <a href="#price" className="font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                Comece agora
              </a>
              <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
            </button>
          </div>
        </div>
        <Image src={Woman} alt="Mulher segurando uma prancheta" className="ml-5 max-lg:hidden max-w-[30%] max-h-[30%] object-cover"/>
      </div>

      <div className="w-full h-[2px] bg-gradient-to-r from-emerald-500 to-[#ebebeb]"/>
    </section>
  )
}

export default Hero