import Joi from "joi";
import authService from "../../models/auth/authService.js";
import jwt from "jsonwebtoken";

const authController = {
    
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
            const loginResponse = await authService.login(req.body);

            if (loginResponse.error) {
                return res.status(400).json({ error: loginResponse.error });
            }

            const { user, subscription } = loginResponse

            if (user && subscription.status === 'active') {
                const token = jwt.sign({ userId:user.id}, process.env.JWT_SECRET_KEY, {
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