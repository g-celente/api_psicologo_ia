import { prisma } from "../prisma.js";

const pagamentoService = {
    compraRealizada: async (email, plano) => {
        if (email || plano)  {
            return true
        }
    }
}