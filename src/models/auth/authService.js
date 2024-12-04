import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';

const authService = {

    signUp: async (data) => {

        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (user) {
            return

        }  
        else {
            try {
                const hashedPassword = await bcrypt.hash(data.senha, 10);
                const newUser = prisma.user.create({
                    data: {
                        nome: data.nome,
                        email: data.email,
                        senha: hashedPassword
                    }
                })
                return newUser
    
            } catch (error) {
                return error
            }
        }

    },

    login: async (body) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: body.email,
                },
            });

            if (!user) {
                console.log('Usuário não encontrado');
                return;
            }

            const passwordMatch = await bcrypt.compare(body.senha, user.senha);

            if (!passwordMatch) {
                return;
            }

            return user;
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    },

}

export default authService;