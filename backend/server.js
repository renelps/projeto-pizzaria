const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Habilita o modo de depuração do Mongoose
mongoose.set('debug', true);

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const pizzaRoutes = require('./routes/pizzas');
app.use('/api/pizzas', pizzaRoutes);

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
