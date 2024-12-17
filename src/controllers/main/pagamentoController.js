

const pagamentoController = {
    compraRealizada: async (req, res) => {
        console.log(req.body)

        res.status(200).json({ message: 'Notificação recebida com sucesso' });

    }
}


export default pagamentoController