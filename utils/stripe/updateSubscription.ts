import { stripe } from '@/libs/stripe'

type props = {
    id_subscription: string
    id_previous_plan: string,
    id_next_plan: string
}

export default async function updateSubscription({id_subscription, id_previous_plan, id_next_plan}: props) {
    const data = await stripe.subscriptions.update(id_subscription, {
        items: [
            {
                billing_thresholds: "",
                deleted: true,
                id: id_previous_plan,
            },
            {
                billing_thresholds: "",
                plan: id_next_plan,
                deleted: false,
                quantity: 1
            }
        ]
    })
    .catch(err => err)

    return data
}