import paymentService from "../../models/payment/paymentService.js";
import stripe from "stripe";

const stripe2 = stripe(process.env.STRIPE_SECRET_KEY)


const paymentController = {
    paymentSuccess: async (req, res) => {

        try {
            const sig = req.headers['stripe-signature']

            let event 

            try {
                event = stripe2.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_WEEBHOOK)
            } catch (err) {
                console.log(err.message)
                return res.status(400).json({error: "Erro ao tentar fazer o webhook"})
            }

            if (event.type == 'checkout.session.completed') {
                const password = process.env.GENERATED_PASSWORD

                const session = event.data.object; // O objeto da sessão de checkout
                const customerDetails = session.customer_details; // Informações do cliente
                const subscriptionId = session.subscription; // ID da assinatura
                const customerId = session.customer //ID do usuário customer_id

                // Agora que temos o subscriptionId, podemos buscar os detalhes da assinatura e do produto
                const subscription = await stripe2.subscriptions.retrieve(subscriptionId, {
                    expand: ['items.data.plan.product'],  // Expansão do produto associado ao plano
                });

                // Detalhes do produto (por exemplo, nome e ID do produto)
                const product = subscription.items.data[0].plan.product;
                const productId = product.id;
                const productName = product.name;

                const plan = await paymentService.getPlanByStripe(productId)

                if (!plan) {
                    console.log("Erro ao encontrar o plano")
                    return res.status(500).send()
                }
                
                const newUser = await paymentService.paymentSuccess(customerDetails, subscriptionId, subscription, customerId, password, plan)

                if (!newUser) {
                    console.log("Erro")
                    return res.status(500).json({
                        success: false
                    })
                }

                console.log(newUser)
                return res.status(200).json({
                    success: true
                })
            }

            return res.send(200)

        } catch (err) {
            console.log(err)
            return res.send(500)
        }
    }
}


export default paymentController