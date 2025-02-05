import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';

const userService = {
    getUsers: async () => {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            console.log("Erro ao tentar buscar os usuários", error)
        }
    },

    perfil:  async (id) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        const address = await prisma.address.findUnique({
            where: {
                userId: user.id
            }
        })

        if (!user || !address) {
            return
        }

        return { user, address }
    },

    addImage: async (img, id) => {
        try {
            const updateUser = await prisma.user.update({
                where: {
                    id:id
                },
                data: {
                    user_img: img
                }
            })

            return updateUser

        } catch (err) {
            console.error("Erro ao atualizar a imagem do usuário:", err);
            return
        }
    },

    alterPassword: async (id, data) => {
        try {
            const hashedPassword = await bcrypt.hash(data.newPassword, 10);

            const password = await prisma.user.update({
                where: {
                    id:id
                },
                data: {
                    senha:hashedPassword
                }
            })

            return password;
        } catch (err) {
            console.log(`Erro ao tentar mudar a senha> ${err}`)
            return
        }
    }
}

export default userService