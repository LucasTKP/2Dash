import { stripe } from '@/libs/stripe'

type props = {
    id_user: string
}

export default async function createClientPortal({id_user}: props) {
    const products = [
        {
            product: process.env.NODE_ENV == 'production' ? 'prod_NGwCFFXGfAjdGS' : 'prod_NHfD4s3TVKYqVg',
            prices: process.env.NODE_ENV == 'production' ? ['price_1MWOK9BC8E6EzctJdmUUhFuq', 'price_1MWOK9BC8E6EzctJDvGkA3uN'] : ['price_1MX5tXBC8E6EzctJCEiUGV4h', 'price_1MX5tXBC8E6EzctJiSSGnlWw']
        },
        {
            product: process.env.NODE_ENV == 'production' ? 'prod_NGwIVWQ9NxtGd0' : 'prod_NHfEduR1esJt4U',
            prices: process.env.NODE_ENV == 'production' ? ['price_1MWOQDBC8E6EzctJlGLz4BA4', 'price_1MWOQDBC8E6EzctJH8kFWcmc'] : ['price_1MX5u3BC8E6EzctJlS8NCOJF', 'price_1MX5u3BC8E6EzctJLblqdVuF']
        },
        {
            product: process.env.NODE_ENV == 'production' ? 'prod_NGwMHbouqwPCFK' : 'prod_NHfFaEi5h2uFE0',
            prices: process.env.NODE_ENV == 'production' ? ['price_1MWOToBC8E6EzctJW4nbf3MJ', 'price_1MWOToBC8E6EzctJvi6IzGSC'] : ['price_1MX5uXBC8E6EzctJ1TMCPSoE', 'price_1MX5uXBC8E6EzctJ1qaXp8ho']
        }
    ]

    const configs = await stripe.billingPortal.configurations.create({
        business_profile: {
            headline: 'Seja bem-vindo a área de assinantes do 2Docs 👋'
        },

        features: {
            invoice_history: {
                enabled: true
            },
            customer_update: {
                enabled: true,
                allowed_updates: ['name', 'email']
            },
            payment_method_update: {
                enabled: true,
            },
            subscription_update: {
                default_allowed_updates: ['price', 'promotion_code'],
                enabled: true,
                products: products
            },
            subscription_cancel: {
                enabled: true,
                cancellation_reason: {
                    enabled: true,
                    options: [
                        'too_expensive',
                        'low_quality',
                        'missing_features',
                        'too_complex',
                        'switched_service',
                        'other'
                    ]
                }
            }
        }
    })

    const session = await stripe.billingPortal.sessions.create({
        customer: id_user,
        configuration: configs.id,
        return_url: 'https://2docs.app/dashboard/assinatura'
    })

    return session.url
}