import userService from "../../models/main/userService.js";

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await userService.getUsers()
            console.log(users)

            if (users) {
                return res.status(200).json({ users: users})
            }

            return res.send([])
        } catch (error) {
            console.log('Erro ao tentar receber os usuários', error)
            return res.status(500)
        }
    },

    Perfil: async (req, res) => {
        try {
            const userId = req.userId
            
            const user = await userService.perfil(userId)

            if (!user) {
                return res.status(404).json({ error:"usuario não encontrado"})
            }

            res.status(200).json({
                id: user.id,
                nome:user.nome,
                email: user.email,
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default userController