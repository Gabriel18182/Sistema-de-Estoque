const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv/config'); //Para armazenar variáveis importantes de forma escondida

// Configuração do banco de dados
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secreto',  // Use uma chave secreta para assinar as sessões
  resave: false,
  saveUninitialized: true,
}));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Função middleware para verificar se o usuário está logado
function verificarAutenticacao(req, res, next) {
  if (!req.session.usuario) {  // Verifica se o usuário não está logado
    return res.redirect('/usuarios/login');  // Redireciona para a tela de login
  }
  next();  // Se estiver logado, continua a execução
}

app.use('/vendas', verificarAutenticacao);
app.use('/fornecedores', verificarAutenticacao);

// Usando as rotas de fornecedores e vendas
app.use('/fornecedores', require('./routes/fornecedor'));
app.use('/vendas', require('./routes/venda'));

// Usando as rotas de usuários
app.use('/usuarios', require('./routes/usuario'));

// Rota principal protegida, redirecionando para o login se o usuário não estiver logado
app.get('/', verificarAutenticacao, (req, res) => {
    res.render('index');
});

// Servidor
app.listen(process.env.PORT, function(){
  console.log('Servidor rodando');
});
