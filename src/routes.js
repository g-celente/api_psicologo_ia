import { Router } from "express";
import authController from "./controllers/auth/authController.js";
import userController from "./controllers/main/userController.js";
import verifyJwt from "./middlewares/verifyToken.js";


const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true })
});

//ROTAS PARA AUTENTICAÇÃO
routes.post('/register', authController.signUp)
routes.post('/login', authController.login)

//ROTAS PARA USUÁRIOS
routes.get('/users', verifyJwt, userController.getUsers)
routes.post('/logout', verifyJwt, authController.logout)
routes.get('/perfil', verifyJwt, userController.Perfil)

export default routes;