const express = require("express");
const multer = require("multer");
const path = require("path");
const Pizza = require("../models/Pizza");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, preco, popularidade, categoria, ingredientes, disponivel, tempo_preparo } = req.body;

    const novaPizza = new Pizza({
      nome,
      descricao,
      preco,
      popularidade,
      categoria,
      ingredientes: ingredientes.split(","),
      imagem: req.file ? "/uploads/" + req.file.filename : null,
      disponivel,
      tempo_preparo
    });

    await novaPizza.save();
    res.status(201).json(novaPizza);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao salvar a pizza" });
  }
});

router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar as pizzas" });
  }
});

module.exports = router;
