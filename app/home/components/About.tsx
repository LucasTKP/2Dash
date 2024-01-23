import Image from "next/image"
import Sale from '@/public/Home/sale.svg'
import Security from '@/public/Home/security.svg'
import Fast from '@/public/Home/fast.svg'

function About() {
    return (
        <>  
            <div className="container" id="sobre">
                <h2 className="font-jost text-dynamic_sections mb-20 max-w-[1000px]">Por quê <span className="text-transparent bg-clip-text bg-gradient-to-b from-white">escolher o 2Docs?</span></h2>
            </div>
            <section className="grid gap-10 grid-cols-2 max-w-[1200px] mx-auto max-2xl:container" id='funcionalidades'>
                <div className="col-span-2 lg:flex items-center justify-center gap-16 border-4 border-emerald-600 rounded-[20px] shadow-emerald-500/50 shadow-[0_0_14px_0] sm:min-h-[300px] p-10 max-xs:p-6">
                    <div className="xl:flex gap-5 items-center mr-4 max-lg:flex">
                        <Image src={Security} alt='Organização e planejamento' className="max-xs:w-[70px]"></Image>
                        <h3 className="text-[36px] font-semibold text-neutral-400 max-sm:text-[28px]">Segurança</h3>
                    </div>
                    <p className="max-w-[600px] text-[20px] max-xs:text-[16px] max-lg:mt-5 text-neutral-300">
                    Todos os documentos de nossos clientes passam por backups diário, são <span className="text-white font-medium">100% seguros</span> e com uma proteção feita especialmente pelo <span className="text-white font-medium">Google</span>, além de passar por encriptação de ponta a ponta.
                    </p>
                </div>
                <div className="col-span-1 max-lg:col-span-2 border-4 border-emerald-600 rounded-[20px] shadow-emerald-500/50 shadow-[0_0_14px_0] p-10 max-xs:p-6">
                    <div className="flex gap-5 items-center">
                        <Image src={Fast} alt='Segurança e proteção' className="max-xs:w-[70px]"></Image>
                        <h3 className="text-[36px] font-semibold text-neutral-400 max-sm:text-[28px]">Velocidade</h3>
                    </div>
                    <p className="max-w-[600px] text-[20px] max-xs:text-[16px] max-sm:mt-5 text-neutral-300 mt-10">
                        Utilizando as melhores tecnologias do mercado, garantimos o software de gerenciamento de documentos <span className="text-white font-medium">mais rápido e mais eficiente</span> que existe no mercado.
                    </p>
                </div>
                <div className="col-span-1 max-lg:col-span-2 border-4 border-emerald-600 rounded-[20px] shadow-emerald-500/50 shadow-[0_0_14px_0] p-10 max-xs:p-6">
                    <div className="flex gap-5 items-center">
                        <Image src={Sale} alt='Rápido e ágil' className="max-xs:w-[70px]"></Image>
                        <h3 className="text-[36px] font-semibold text-neutral-400 max-sm:text-[28px]">Custo</h3>
                    </div>
                    <p className="max-w-[600px] text-[20px] max-xs:text-[16px] max-sm:mt-5 text-neutral-300 mt-10">
                        Nosso modelo de precificação é claro e direto, sem custos ocultos ou surpresas desagradáveis. <span className="text-white font-medium">Preços flexíveis e escalonamento</span>, para que você possa ajustar seu investimento de acordo com suas necessidades.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About