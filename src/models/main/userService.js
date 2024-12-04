import { prisma } from "../prisma.js";

const userService = {
    getUsers: async () => {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            console.log("Erro ao tentar buscar os usuários", error)
        }
    }
}

export default userService