import {stripe} from '@/libs/stripe'
import {updateCustomer} from '@/utils/stripe'

type props = {
    id_plan: string,
    id: string,
    hadTrial?: boolean | string,
    price?: number
}

export default async function createSession({id_plan, id, hadTrial, price} : props) {
    if(id_plan == 'price_1MX5tXBC8E6EzctJiSSGnlWw' || id_plan == 'price_1MWOK9BC8E6EzctJDvGkA3uN' || id_plan == 'price_1MX5tXBC8E6EzctJCEiUGV4h' || id_plan == 'price_1MWOK9BC8E6EzctJdmUUhFuq') {
        if(hadTrial && hadTrial == 'true') {
            const {url} = await stripe.checkout.sessions.create({
                success_url: `https://2docs.app/sucesso?stats=success&price=${price}`,
                line_items: [
                    {
                        price: id_plan,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                customer: id,
                allow_promotion_codes: true
            })
            .catch((err) => err)
        
            return url
        } else {
            const {url} = await stripe.checkout.sessions.create({
                success_url: `https://2docs.app/sucesso?stats=success&trial=yes&id_user=${id}`,
                line_items: [
                    {
                        price: id_plan,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                customer: id,
                subscription_data: {
                    trial_period_days: 7
                },
                allow_promotion_codes: true
            })
            .catch((err) => err)
        
            return url
        }
    } else {
        const {url} = await stripe.checkout.sessions.create({
            success_url: `https://2docs.app/sucesso?stats=success&price=${price}`,
            line_items: [
                {
                    price: id_plan,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            customer: id,
            allow_promotion_codes: true
        })
        .catch((err) => err)
    
        return url
    }
}