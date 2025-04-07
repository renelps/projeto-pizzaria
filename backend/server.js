require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const pizzaRoutes = require("./routes/pizzas");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos (ex: imagens)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/api/pizzas", pizzaRoutes);

// Conexão com MongoDB usando variável de ambiente
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});