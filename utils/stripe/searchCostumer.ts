import { stripe } from '@/libs/stripe'

type props = {
    id_company: string
}

export default async function searchCostumer({id_company}: props) {
    const {data} = await stripe.customers.search({
        query: 'metadata[\'id_company\']:\'' +id_company+ '\'',
        limit: 1,
        expand: ['data.subscriptions']
    })
    .catch(err => err)

    return data
}