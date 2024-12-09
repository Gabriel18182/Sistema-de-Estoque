const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda'); // Certifique-se de que o modelo Venda está correto
const Fornecedor = require('../models/Fornecedor'); // Certifique-se de que o modelo Fornecedor está correto
const vendaController = require("../controller/VendaController");



// Listar vendas
router.get('/', vendaController.listar);

// Página para registrar nova venda
router.get('/nova', vendaController.adicionar);

// Registrar nova venda
router.post('/nova', vendaController.adicionarPost);

router.get('/:id', vendaController.detalhar);

router.get('/remover/:id', vendaController.deletar);

router.get('/editar/:id', vendaController.editar);

router.post('/editar/:id', vendaController.editarPost);





module.exports = router; // Certifique-se de exportar corretamente o router
