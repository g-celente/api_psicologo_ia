import { Router } from "express";
import authController from "./controllers/auth/authController.js";
import userController from "./controllers/main/userController.js";
import verifyJwt from "./middlewares/verifyToken.js";
import chatGpt from "./controllers/main/conversationController.js";
import paymentController from "./controllers/payment/pagamentoController.js";
import multer from "multer";
import storage from './config.js';
import express from "express"

const upload = multer({ storage: storage });
const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true })
});

//ROTAS PARA AUTENTICAÇÃO
routes.post('/login', authController.login)

//ROTAS PARA USUÁRIOS
routes.get('/users', verifyJwt, userController.getUsers)
routes.post('/logout', verifyJwt, authController.logout)
routes.get('/perfil', verifyJwt, userController.Perfil)
routes.post('/uploadImg', verifyJwt, upload.single('image'), userController.addImage)
routes.post('/alterPassword', verifyJwt, userController.alterPassword)

//ROTAS PARA CONVERSA COM O CHAT
routes.get('/api/getMessage', verifyJwt, chatGpt.getMessages)
routes.post('/api/sendMessage', verifyJwt, chatGpt.sendMessages)


//ROTAS PARA PAGAMENTO
routes.post('/api/payment_success', express.raw({type: 'application/json'}), paymentController.paymentSuccess)


export default routes;