const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController'); // Verifique o caminho

// Exibir o formulário de cadastro
router.get('/cadastrar', UsuarioController.exibirFormularioCadastro);

// Criar um novo usuário (ao submeter o formulário)
router.post('/cadastrar', UsuarioController.criar);  // POST para criar o usuário

// Exibir o formulário de login
router.get('/login', UsuarioController.exibirFormularioLogin);

// Fazer o login (POST para verificar as credenciais)
router.post('/login', UsuarioController.login); // POST para fazer login

// Rota para logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Erro ao finalizar a sessão.');
      }
      res.redirect('/usuarios/login');  // Redireciona para a página de login
    });
  });

module.exports = router;
