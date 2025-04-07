const express = require('express');
const multer = require('multer');
const Pizza = require('../models/Pizza');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/', upload.array('imagens'), async (req, res) => {
  try {
    const pizzasData = req.body.pizzas;

    if (!Array.isArray(pizzasData)) {
      return res.status(400).json({ erro: 'O corpo da requisição deve conter um array de pizzas' });
    }

    const pizzasCriadas = await Pizza.insertMany(
      pizzasData.map((pizza, index) => ({
        nome: pizza.nome,
        descricao: pizza.descricao,
        preco: pizza.preco,
        popularidade: pizza.popularidade,
        categoria: pizza.categoria,
        ingredientes: pizza.ingredientes.split(','),
        imagem: req.files[index] ? `/uploads/${req.files[index].filename}` : null,
        disponivel: pizza.disponivel === 'true',
        tempo_preparo: pizza.tempo_preparo
      }))
    );

    res.status(201).json(pizzasCriadas);
  } catch (error) {
    res.status(400).json({ erro: error.message });
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
    const { nome, descricao, preco, popularidade, categoria, ingredientes, disponivel, tempo_preparo } = req.body;

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
      dadosAtualizados.imagem = `/uploads/${req.file.filename}`;
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