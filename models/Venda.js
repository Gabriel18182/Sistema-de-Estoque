const mongoose = require('mongoose');

// Definição do esquema para a Venda
const VendaSchema = new mongoose.Schema({
  produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valor: { type: Number, required: true },
  fornecedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor', required: true },
  dataVenda: { type: Date, default: Date.now },
}); 

// Exportação do modelo
module.exports = mongoose.model('Venda', VendaSchema);
