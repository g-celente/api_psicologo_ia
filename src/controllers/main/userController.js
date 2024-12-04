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
    }
}

export default userController