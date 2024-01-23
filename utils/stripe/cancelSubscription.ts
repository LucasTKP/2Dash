import { stripe } from '@/libs/stripe'

type props = {
    id_subscription: string
}

export default async function cancelSubscription({id_subscription}: props) {
    const data = await stripe.subscriptions.cancel(id_subscription)
    .catch(err => err)
    
    return data
}