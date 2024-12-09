const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FornecedorSchema = Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  endereco: { type: String },
  telefone: { type: String }
});

module.exports = mongoose.model('Fornecedor', FornecedorSchema);