const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  popularidade: { type: Number, default: 0, min: 0, max: 5 },
  categoria: { type: String, enum: ['Tradicional', 'Especial', 'Doce'], required: true },
  ingredientes: { type: [String], required: true },
  imagem: { type: String, required: true },
  disponivel: { type: Boolean, default: true },
  tempo_preparo: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pizza', PizzaSchema);