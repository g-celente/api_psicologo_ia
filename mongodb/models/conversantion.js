import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  userId: { type: String, required: true },  // ID do usuário que está conversando
  messages: [{
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },  // Quem enviou a mensagem
    content: { type: String, required: true },  // Conteúdo da mensagem
    timestamp: { type: Date, default: Date.now }
  }]
});

const Conversation = model('Conversation', MessageSchema);

export default Conversation
