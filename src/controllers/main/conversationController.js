import OpenAI from "openai";
import conversationModel from "../../models/main/conversationModel.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const chatGpt = {
    getMessages: async (req, res) => {
        try {
            const userId = req.userId

            const messages = await conversationModel.getConversationHistory(userId)

            if (!messages || messages.length === 0) {
                return res.json({ messages: [] }); // Garantir que sempre retorne um array
            }

            return res.status(200).json(messages)

        } catch (e) {
            console.log(e)
            return
        }
        
    },

    sendMessages: async (req, res) => {
        try {
            const userId = req.userId
            const { message } = req.body;
        
            // Adiciona a mensagem do usuário ao histórico no banco
            await conversationModel.addMessage(userId, message, 'user');
        
            // Envia o histórico de mensagens para a API da OpenAI
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: await conversationModel.getConversationHistory(userId),
                max_tokens: 10  // Passa o histórico completo
            });
        
            const assistantMessage = response.choices[0].message.content;
            console.log(assistantMessage)
        
            // Adiciona a resposta do assistente ao histórico de mensagens
            await conversationModel.addMessage(userId, assistantMessage, 'assistant');
        
            // Retorna a resposta do assistente ao front-end
            return res.status(200).json(assistantMessage);
        
        } catch (error) {
            console.log('Erro ao enviar mensagem:', error);
            return res.status(500).json({ error: 'Erro ao enviar mensagem' });
        }
    }
}

export default chatGpt