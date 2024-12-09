const Usuario = require('../models/Usuario'); // Modelo de Usuário
const bcrypt = require('bcryptjs'); // Para verificar a senha

// Função para exibir o formulário de cadastro
exports.exibirFormularioCadastro = (req, res) => {
  res.render('usuarios/cadastro', { title: 'Cadastrar Novo Usuário' });
};

// Função para criar um novo usuário e redirecionar para a página inicial
exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.render('usuarios/cadastro', {
        title: 'Cadastrar Novo Usuário',
        error: 'Este email já está cadastrado.'  // Exibir mensagem de erro
      });
    }

    // Verificar se a senha é muito curta
    if (senha.length < 6) {
      return res.render('usuarios/cadastro', {
        title: 'Cadastrar Novo Usuário',
        error: 'A senha deve ter pelo menos 6 caracteres.'  // Exibir mensagem de erro
      });
    }

    // Criar o novo usuário com os dados do formulário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha
    });

    // Salvar o usuário no banco de dados
    await novoUsuario.save();

    // Redirecionar para a página inicial após o cadastro
    res.redirect('/');  // Redireciona para a página inicial (index.ejs)
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).send('Erro ao cadastrar usuário');
  }
};

// Função para exibir o formulário de login
exports.exibirFormularioLogin = (req, res) => {
  res.render('usuarios/login', { title: 'Login' });
};

// Função para fazer login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      // Se o usuário não existir, retornar erro
      return res.render('usuarios/login', { title: 'Login', error: 'Usuário não encontrado!' });
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      // Se a senha estiver incorreta, retornar erro
      return res.render('usuarios/login', { title: 'Login', error: 'Senha incorreta!' });
    }

    // Se o login for bem-sucedido, redireciona para a página inicial
    res.redirect('/');  // Redireciona para a página index.ejs
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    res.status(500).send('Erro ao fazer login');
  }
};

// Função para fazer login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      // Se o usuário não existir, retornar erro
      return res.render('usuarios/login', { title: 'Login', error: 'Usuário não encontrado!' });
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      // Se a senha estiver incorreta, retornar erro
      return res.render('usuarios/login', { title: 'Login', error: 'Senha incorreta!' });
    }

    // Se o login for bem-sucedido, criar a sessão do usuário
    req.session.usuario = usuario;  // Salva o usuário na sessão

    // Redireciona para a página inicial após o login
    res.redirect('/');  // Redireciona para a página index.ejs
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    res.status(500).send('Erro ao fazer login');
  }
};


