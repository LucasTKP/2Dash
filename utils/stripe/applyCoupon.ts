import { stripe } from '@/libs/stripe'

export default async function applyCoupon({id_subscription}: {id_subscription: string}) {
    const response = await stripe.coupons.create({
        percent_off: 20,
        duration: 'repeating',
        duration_in_months: 3
    })

    await stripe.subscriptions.update(id_subscription, {
        coupon: response.id
    })
}