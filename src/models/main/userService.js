import { prisma } from "../prisma.js";

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

        if (!user) {
            return
        }

        return user
    }
}

export default userService