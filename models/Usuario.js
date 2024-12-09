const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Definindo o esquema de um usuário
const UsuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Por favor, insira um e-mail válido.']
  },
  senha: { 
    type: String, 
    required: true, 
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres.'] 
  }
}, { timestamps: true });

// Criptografar a senha antes de salvar no banco de dados
UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Exportando o modelo de Usuario
module.exports = mongoose.model('Usuario', UsuarioSchema);
