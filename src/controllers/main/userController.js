import req from "express/lib/request.js";
import userService from "../../models/main/userService.js";
import Joi from "joi";

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
            
            const { user, address} = await userService.perfil(userId)

            if (!user || !address) {
                return res.status(404).json({ error:"usuario não encontrado"})
            }

            const img = user.user_img ? user.user_img.replace(/\\/g, '/') : null;

            const imageUrl = img ? `https://api-psicologo-ia.vercel.app/${img}` : null;

            res.status(200).json({
                id: user.id,
                nome:user.nome,
                email: user.email,
                user_img: imageUrl,
                phone: user.phone,
                customer: user.customer_id,
                address: address
            })
            
        } catch (error) {
            console.log(error)
        }
    },
    
    addImage: async (req, res) => {
        const userId = req.userId
        const imagePath = req.file ? req.file.path : null

        if (!imagePath) {
            return res.status(404).json({
                error: "nenhuma imagem encontrada"
            })
        }

        const updateUser = await userService.addImage(imagePath, userId)

        if (updateUser) {
            return res.status(200).json({
                success: "Imagem adicionada com sucesso!"
            })
        }

        return res.status(500).json({
            error: "Erro ao adicionar imagem do usuário"
        })

    },

    alterPassword: async (req, res) => {
        const schema = Joi.object({
                    newPassword: Joi.string().required(),
                });
        
        const { error } = schema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                error: error.details[0].message});
        }
        const userId = req.userId

        const alterPassword = await userService.alterPassword(userId, req.body)

        if (!alterPassword) {
            return res.status(500).json({
                error: "Erro ao tentar alterar a senha"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Senha alterada com sucesso!"
        })
    }
}

export default userController