import { retrivePrice } from '@/utils/stripe'
import { ChangePrice } from "./ChangePrice"
import { PriceContext } from "./PriceContext"
import Image from "next/image"
import ArrowRight from '@/public/Home/arrowRight.svg'
import Tag from '@/public/Home/tag.svg'
import PricesCardLP from "./PricesCardLP"

type props = {
    screen?: string
}

async function Prices({ screen}: props) {
    const products = await retrivePrice()

    // Props mock for prices card - Because of that don`t have type
    const freePrice = {
        title: 'Grátis',
        obs: 'Para aqueles que querem dar o primeiro passo nas boas relações com seus clientes sem gastar nada.',
        anualPrice: 0,
        mensalPrice: 0,
        links: {
            anual: `/cadastro?free`,
            mensal: `/cadastro?free`
        },
        ids: {
            anual: products[2].id,
            mensal: products[3].id
        },
        includes: [
            '1 Admin',
            'Até 150mb de armazenamento',
            'Subdomínio personalizado',
        ],
        excludes: [
            'Personalização inclusa',
            'Domínio próprio',
            'Suporte via WhatsApp',
            'Logs de eventos'
        ]
    }

    const inicialPrice = {
        title: 'Inicial',
        obs: 'Para um empreendedor com a necessidade de organizar e agilizar todas as coisas, com qualidade 2Core.',
        anualPrice: products[2].price,
        mensalPrice: products[3].price,
        links: {
            anual: `/cadastro?plan=${products[2].id}`,
            mensal: `/cadastro?plan=${products[3].id}`
        },
        ids: {
            anual: products[2].id,
            mensal: products[3].id
        },
        includes: [
            '1 Admin',
            'Até 5gb de armazenamento',
            'Subdomínio personalizado',
        ],
        excludes: [
            'Personalização inclusa',
            'Domínio próprio',
            'Suporte via WhatsApp',
            'Logs de eventos'
        ]
    }

    const professionalPrice = {
        title: 'Profissional',
        obs: 'Para empresas de médio porte com sede de automatizar e facilitar a vida. Divida as tarefas com mais funcionários.',
        anualPrice: products[4].price,
        mensalPrice: products[5].price,
        links: {
            anual: `/cadastro?plan=${products[4].id}`,
            mensal: `/cadastro?plan=${products[5].id}`
        },
        ids: {
            anual: products[4].id,
            mensal: products[5].id
        },
        includes: [
            '3 Admin',
            'Até 10gb de armazenamento',
            'Subdomínio personalizado',
            'Domínio próprio',
            'Suporte via WhatsApp',
        ],
        excludes: [
            'Personalização inclusa',
            'Logs de eventos'
        ]
    }

    const businessPrice = {
        title: 'Empresarial',
        obs: 'Empresas que não medem esforços e necessitam de algo mais parrudo, com um suporte personalizado 2Core.',
        anualPrice: products[0].price,
        mensalPrice: products[1].price,
        links: {
            anual: `/cadastro?plan=${products[0].id}`,
            mensal: `/cadastro?plan=${products[1].id}`
        },
        ids: {
            anual: products[0].id,
            mensal: products[1].id
        },
        includes: [
            '5 Admin',
            'Até 20gb de armazenamento',
            'Subdomínio personalizado',
            'Personalização inclusa',
            'Domínio próprio',
            'Suporte via WhatsApp',
            'Logs de eventos'
        ],
        excludes: []
    }

    return (
        <PriceContext>
            <section id='price' className="px-[40px] max-sm:px-[20px] mt-20 flex flex-col items-start">
                <div className="text-[#555555] w-full flex flex-col items-center">
                    <p className="text-center font-[400] text-[#005532] text-[70px] max-2xl:text-[65px] max-lg:text-[45px] max-md:text-[40px] max-xs:text-[35px]">Faça o <span className="font-medium">teste grátis</span> agora!</p>
                    <p className="w-fit relative text-center font-[400] text-[50px] max-2xl:text-[45px] max-lg:text-[35px] max-md:text-[30px] max-xs:text-[25px] underline underline-offset-[10px]" >Sem cobrança e compromisso algum.</p>
                    <button className={`mt-[50px] flex items-center bg-emerald-500 pl-[10px] max-sm:pl-[8px] pr-[16px] max-sm:pr-[15px] py-[9px] max-sm:py-[7px] rounded-[16px] max-lg:rounded-[12px] max-sm:rounded-[10px] duration-100 hover:bg-emerald-600`}>
                        <a href="#price" className="text-white font-medium text-[22px] max-lg:text-[16px] whitespace-nowrap">
                            Comece agora
                        </a>
                        <Image src={ArrowRight} alt="seta" className="ml-[8px]" />
                    </button>
                    <div className="flex whitespace-nowrap flex-wrap justify-center mt-[20px]">
                        <p>Sem a necessidade de cartão de crédito </p>
                        <p className="flex"> <Image src={Tag} alt="seta" className="mx-[10px]" /> Plano gratuito por tempo ilimitado</p>
                    </div>

                </div>

                <div className="w-full flex justify-center mb-20 mt-[50px]">
                    <ChangePrice />
                </div>

                <div className="flex max-xl:flex-wrap gap-[20px] justify-between max-lg:justify-center items-start mb-5">
                    <PricesCardLP
                        title={freePrice.title}
                        obs={freePrice.obs}
                        anualPrice={freePrice.anualPrice}
                        mensalPrice={freePrice.mensalPrice}
                        ids={screen ? freePrice.ids : undefined}
                        links={screen ? undefined : freePrice.links}
                        includes={freePrice.includes}
                        excludes={freePrice.excludes}
                    />
                    <PricesCardLP
                        title={inicialPrice.title}
                        obs={inicialPrice.obs}
                        anualPrice={inicialPrice.anualPrice}
                        mensalPrice={inicialPrice.mensalPrice}
                        ids={screen ? inicialPrice.ids : undefined}
                        links={screen ? undefined : inicialPrice.links}
                        includes={inicialPrice.includes}
                        excludes={inicialPrice.excludes}
                    />
                    <PricesCardLP
                        title={professionalPrice.title}
                        obs={professionalPrice.obs}
                        anualPrice={professionalPrice.anualPrice}
                        mensalPrice={professionalPrice.mensalPrice}
                        ids={screen ? professionalPrice.ids : undefined}
                        links={screen ? undefined : professionalPrice.links}
                        includes={professionalPrice.includes}
                        excludes={professionalPrice.excludes} />
                    <PricesCardLP
                        title={businessPrice.title}
                        obs={businessPrice.obs}
                        anualPrice={businessPrice.anualPrice}
                        mensalPrice={businessPrice.mensalPrice}
                        ids={screen ? businessPrice.ids : undefined}
                        links={screen ? undefined : businessPrice.links}
                        includes={businessPrice.includes}
                        excludes={businessPrice.excludes} />
                </div>
            </section>
        </PriceContext>
    )
}

export default Prices