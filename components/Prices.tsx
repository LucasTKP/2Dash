import PricesCard from "./PricesCard"
import {retrivePrice} from '@/utils/stripe'
import { ChangePrice } from "./ChangePrice"
import { PriceContext } from "./PriceContext"

type props = {
    screen?: string
}

async function Prices({screen}: props) {
    const products = await retrivePrice()

    // Props mock for prices card - Because of that don`t have type
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
            <section id='price' className="container mt-20">
                <p className="bg-emerald-500/30 border-2 border-emerald-500 inline-flex rounded-full px-6 py-2 text-emerald-500 text-[24px] font-medium mb-5">Planos</p>
                <h2 className="font-jost text-dynamic_sections mb-5 max-w-[1000px]">Escolha o plano <span className="text-transparent bg-clip-text bg-gradient-to-b from-white">que mais adéqua a seu negócio.</span></h2>
                <div className="bg-gradient-to-b from-neutral-200 to-neutral-700 inline-flex p-[4px] rounded-md mb-20">
                    <p className="bg-neutral-200/50 text-neutral-800 px-6 py-1 font-medium text-[20px] rounded-sm max-sm:text-[16px]">Aproveite 7 dias de teste no plano básico!</p>
                </div>
                <div className="w-full flex justify-center mb-20">
                    <ChangePrice />
                </div>
                <div className="lg:flex gap-10 justify-between items-center mb-5">
                    <PricesCard 
                        title={inicialPrice.title} 
                        obs={inicialPrice.obs} 
                        anualPrice={inicialPrice.anualPrice} 
                        mensalPrice={inicialPrice.mensalPrice}
                        ids={screen ? inicialPrice.ids : undefined}
                        links={screen ? undefined : inicialPrice.links} 
                        includes={inicialPrice.includes}
                        excludes={inicialPrice.excludes}
                        />
                    <PricesCard 
                        title={professionalPrice.title} 
                        obs={professionalPrice.obs} 
                        anualPrice={professionalPrice.anualPrice} 
                        mensalPrice={professionalPrice.mensalPrice} 
                        ids={screen ? professionalPrice.ids : undefined}
                        links={screen ? undefined : professionalPrice.links}  
                        includes={professionalPrice.includes}
                        excludes={professionalPrice.excludes}/>
                    <PricesCard 
                        title={businessPrice.title} 
                        obs={businessPrice.obs} 
                        anualPrice={businessPrice.anualPrice} 
                        mensalPrice={businessPrice.mensalPrice} 
                        ids={screen ? businessPrice.ids : undefined}
                        links={screen ? undefined : businessPrice.links}  
                        includes={businessPrice.includes}
                        excludes={businessPrice.excludes}/>
                </div>
                <h2 className="text-center mb-16 text-[20px] text-neutral-400">*A personalizaçao será cobrada a parte no checkout, logo em seguida entraremos em contato.*</h2>
            </section>
        </PriceContext>
    )
}

export default Prices