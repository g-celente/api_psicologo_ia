import express from "express";
import cors from "cors";  // Adicionando o pacote CORS para permitir requisições de outras origens
import routes from "./routes.js";

const app = express();

// Configurando o middleware CORS para permitir requisições de qualquer origem
app.use(cors());

// Middleware para permitir que a aplicação parseie JSON nas requisições
app.use(express.json());

// Definindo as rotas da aplicação
app.use(routes);

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
