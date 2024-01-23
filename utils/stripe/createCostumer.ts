import {stripe} from '@/libs/stripe'

type props = {
    email: string,
    id_company: string
}

export default async function createCostumer({email, id_company}: props) {
    const {id} = await stripe.customers.create({
        email: email,
        metadata: {
            id_company
        }
    })
    .catch(err => err)
    
    return id
}