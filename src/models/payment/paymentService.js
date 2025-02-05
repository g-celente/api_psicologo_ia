import { prisma } from "../prisma.js";
import bcrypt from "bcrypt"
import { newAcountEmail } from "../../functions/helpers.js";


const paymentService = {
    paymentSuccess: async (customer, subscriptionId, subscription, customerId, password, plan) => {
        try {
            // Cria o usuário
            const newUser = await prisma.user.create({
                data: {
                    nome: customer.name,
                    email: customer.email,
                    senha: await bcrypt.hash(password, 10),
                    customer_id: customerId,
                    address: {  // Cria o endereço relacionado ao usuário
                        create: {
                            city: customer.address.city,
                            country: customer.address.country,
                            line1: customer.address.line1,
                            line2: customer.address.line2 || '',
                            postal_code: customer.address.postal_code,
                            state: customer.address.state
                        }
                    },
                    subscription: {  // Cria a assinatura relacionada ao usuário
                        create: {
                            stripe_subscription_id: subscriptionId,
                            start_date: new Date(subscription.current_period_start * 1000), // Converte timestamp para Date
                            end_date: new Date(subscription.current_period_end * 1000),   // Converte timestamp para Date
                            status: subscription.status,
                            plan: {
                                connect: { id: plan.id }  // Conecta o plano existente pelo ID
                            } // status pode ser "active", "canceled", etc.
                        }
                    }
                }
            });

            /*// Envia o e-mail para o novo usuário
            const emailSent = await newAcountEmail(newUser.name, newUser.email, password, plan.name)

            if (!emailSent) {
                console.log('Erro ao enviar o e-mail de boas-vindas');
                return
            }*/
            return newUser; // Retorna o usuário criado, ou outros dados conforme necessário
        } catch (error) {
            console.error('Erro ao criar o usuário ou assinatura:', error);
            return 
        }
    },

    getPlanByStripe: async (planId) => {
        try {

            const plan = await prisma.plan.findFirst({
                where: {
                    id_stripe: planId
                }
            })

            if (!plan) {
                return 
            }

            return plan

        } catch (err) {
            console.log(err)
            return 
        }
    }
};

export default paymentService;
