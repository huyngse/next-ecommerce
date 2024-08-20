import { urlFor } from "@/lib/client";
import { CartItemType, ProductType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const lineItems = req.body.map((item: CartItemType) => {
                const img = urlFor(item.product.image[0]);
                // const img = (item.product.image[0] as any).asset._ref;
                // const newImage = img
                // .replace('image-', `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`)
                // .replace(/-(?!.*-)/, '.');
                return {
                    price_data: {
                        currency: 'vnd',
                        unit_amount: item.product.price * item.quantity * 25000,
                        product_data: {
                            name: item.product.name,
                            description: item.product.detail,
                            images: [img],
                        },
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            });
            const params = {
                submit_type: "pay",
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    {
                        shipping_rate: 'shr_1PpjFfP2K7Dxp9PrmRuGy1qZ'
                    },
                    {
                        shipping_rate: 'shr_1PpgigP2K7Dxp9PrUrCMBdL2'
                    }
                ],
                line_items: lineItems,
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            // res.redirect(303, session.url);
            res.status(200).json(session);
        } catch (err) {
            console.log(err)
            const error = err as any;
            res.status(error.statusCode || 500).json(error.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}