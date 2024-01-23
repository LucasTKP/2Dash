import { stripe } from '@/libs/stripe'

type prices = {
    id: string,
    price: number
}

function formatPrice(price: number): number {
    return (price / 100)
}

export default async function retrivePrices(): Promise<prices[]> {
    const [empresarialAnual, empresarialMensal, inicialAnual, inicialMensal, profissionalAnual, profissionalMensal] = await Promise.all([
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5uXBC8E6EzctJ1qaXp8ho' : 'price_1MWOToBC8E6EzctJvi6IzGSC'),
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5uXBC8E6EzctJ1TMCPSoE' : 'price_1MWOToBC8E6EzctJW4nbf3MJ'),
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5tXBC8E6EzctJiSSGnlWw' : 'price_1MWOK9BC8E6EzctJDvGkA3uN'),
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5tXBC8E6EzctJCEiUGV4h' : 'price_1MWOK9BC8E6EzctJdmUUhFuq'),
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5u3BC8E6EzctJLblqdVuF' : 'price_1MWOQDBC8E6EzctJH8kFWcmc'),
        stripe.prices.retrieve(process.env.NODE_ENV == 'development' ? 'price_1MX5u3BC8E6EzctJlS8NCOJF' : 'price_1MWOQDBC8E6EzctJlGLz4BA4')
    ])
    .catch(err => err)

    return [
        {
            id: empresarialAnual.id,
            price: (formatPrice(empresarialAnual.unit_amount ? empresarialAnual.unit_amount : 0) / 12)
        },
        {
            id: empresarialMensal.id,
            price: formatPrice(empresarialMensal.unit_amount ? empresarialMensal.unit_amount : 0)
        },
        {
            id: inicialAnual.id,
            price: (formatPrice(inicialAnual.unit_amount ? inicialAnual.unit_amount : 0) / 12)
        },
        {
            id: inicialMensal.id,
            price: formatPrice(inicialMensal.unit_amount ? inicialMensal.unit_amount : 0)
        },
        {
            id: profissionalAnual.id,
            price: (formatPrice(profissionalAnual.unit_amount ? profissionalAnual.unit_amount : 0) / 12)
        },
        {
            id: profissionalMensal.id,
            price: formatPrice(profissionalMensal.unit_amount ? profissionalMensal.unit_amount : 0)
        }
    ]
}