const express = require('express');
const router = express.Router();
const Fornecedor = require('../models/Fornecedor'); // Certifique-se de que o modelo Fornecedor está correto
const fornecedorController = require("../controller/FornecedorController");

// Listar fornecedores
router.get('/', fornecedorController.listar);

// Página para criar novo fornecedor
router.get('/novo', fornecedorController.adicionar);

// Registrar novo fornecedor
router.post('/novo', fornecedorController.adicionarPost);

// Mostrar detalhes de um fornecedor
router.get('/:id', fornecedorController.detalhar);

//Remove fornecedor
router.get('/remover/:id', fornecedorController.deletar);

//Atualizar Fornecedor
router.get('/editar/:id', fornecedorController.editar);

//Mandar informações
router.post('/editar/:id', fornecedorController.editarPost);



module.exports = router; // Certifique-se de exportar corretamente o router
