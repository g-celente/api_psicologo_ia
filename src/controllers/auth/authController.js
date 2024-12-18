import Joi from "joi";
import authService from "../../models/auth/authService.js";
import jwt from "jsonwebtoken";

const authController = {
    
    signUp: async (req, res) => {
        const schema = Joi.object ({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(6).required()
        })

        const { error } = schema.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const newUser = await authService.signUp(req.body)

            if (newUser) {
                return res.status(200).json({ user: newUser})
            }

            return res.status(400).json({"error": "usuário já registrado" })

        } catch (error) {
            console.log('Error', error)
            return res.status(500)
        }
        
    },

    login: async (req, res) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const user = await authService.login(req.body)
            if (user) {
                const token = jwt.sign({ userId:user.id}, "guizao12345", {
                    expiresIn: 5000
                })
                return res.status(200).json({ auth:true, token:token})
            } 
            return res.status(400).json({"error":"usuário ou senha inválidos"})

        } catch (error) {
            return res.status(500)
        }
    },
    logout: async (req, res) => {
        return res.status(200).json({ auth:false, token:null})
    }
}

export default authController