import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';

const authService = {

    login: async (body) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: body.email,
                },
            });

            if (!user) {
                console.log('Usuário não encontrado');
                return { error: 'Usuário Não Encontrado'}
            }

            const passwordMatch = await bcrypt.compare(body.senha, user.senha);

            if (!passwordMatch) {
                console.log('Senha incorreta');
                return { error: 'Senha incorreta' };
            }

            const subscription = await prisma.subscription.findUnique({
                where: {
                    user_id: user.id
                }
            })

            console.log(subscription)

            if (!subscription) {
                return {error: 'Usuário não inscrito no sistema'};
            }

            return {user, subscription};
            
        } catch (error) {
            console.log('Error', error);
        }
    },

}

export default authService;