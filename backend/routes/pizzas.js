const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const Pizza = require('../models/Pizza');

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const {
      nome, descricao, preco, popularidade,
      categoria, ingredientes, disponivel, tempo_preparo
    } = req.body;

    const novaPizza = await Pizza.create({
      nome,
      descricao,
      preco,
      popularidade,
      categoria,
      ingredientes: ingredientes.split(','),
      imagem: req.file?.path || null,
      disponivel: disponivel === 'true',
      tempo_preparo
    });

    res.status(201).json(novaPizza);
  } catch (error) {
    res.status(500).json({ erro: error.message, stack: error.stack });
  }
});

router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.put('/:id', upload.single('imagem'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome, descricao, preco, popularidade,
      categoria, ingredientes, disponivel, tempo_preparo
    } = req.body;

    const dadosAtualizados = {
      nome,
      descricao,
      preco,
      popularidade,
      categoria,
      ingredientes: ingredientes ? ingredientes.split(',') : undefined,
      disponivel: disponivel === 'true',
      tempo_preparo
    };

    if (req.file) {
      dadosAtualizados.imagem = req.file.path;
    }

    const pizzaAtualizada = await Pizza.findByIdAndUpdate(id, dadosAtualizados, { new: true });

    if (!pizzaAtualizada) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }

    res.status(200).json(pizzaAtualizada);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pizzaRemovida = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizzaRemovida) {
      return res.status(404).json({ erro: 'Pizza não encontrada' });
    }
    res.status(200).json({ mensagem: 'Pizza removida com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Pizza.deleteMany({});
    res.status(200).json({ mensagem: 'Todas as pizzas foram removidas' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

