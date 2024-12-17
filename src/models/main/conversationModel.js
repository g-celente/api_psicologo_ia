import Conversation from "../../../mongodb/models/conversantion.js";
import mongoose from "mongoose";

const conversationModel = {
    getConversationHistory: async (userId) => {
        try {
            // Buscar a conversa do usuário, ordenando as mensagens pela data (do mais antigo para o mais recente)
            const conversation = await Conversation.findOne({ userId }).sort({ 'messages.timestamp': 1 });
        
            if (!conversation) {
              return; // Caso não exista conversa, retornar uma lista vazia
            }
        
            return conversation.messages;
        } catch (error) {
            console.error('Erro ao buscar o histórico de conversas:', error);
            throw new Error('Erro ao buscar o histórico de conversas');
        }
    },

    addMessage: async (userId, message, role) => {
        try {
          // Verificar se já existe uma conversa para o usuário
          let conversation = await Conversation.findOne({ userId });
    
          // Se não existir, criar uma nova conversa
          if (!conversation) {
            conversation = new Conversation({ userId, messages: [] });
          }
    
          // Adicionar a nova mensagem ao histórico
          const newMessage = {
            role,
            content: message,
            timestamp: new Date(),  // Adiciona a data de envio
          };
          conversation.messages.push(newMessage);
    
          // Salvar a conversa atualizada no banco de dados
          await conversation.save();
    
          return newMessage;  // Retorna a nova mensagem adicionada
        } catch (error) {
          console.error('Erro ao adicionar mensagem:', error);
          throw new Error('Erro ao adicionar mensagem');
        }
    }
}

export default conversationModel