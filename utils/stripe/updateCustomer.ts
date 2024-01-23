import { stripe } from '@/libs/stripe'

type props = {
    id_custumer: string;
    data: Object
}

export default async function updateCustomer({id_custumer, data}: props) {
    const res = await stripe.customers.update(id_custumer, data)
    .catch(err => err)

    return res
}