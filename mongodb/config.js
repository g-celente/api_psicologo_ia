// /config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB conectado!');
    return conn;
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1); // Encerra o processo caso a conexão falhe
  }
};

export default connectDB;
