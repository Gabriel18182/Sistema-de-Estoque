const Venda = require('../models/Venda');
const Fornecedor = require('../models/Fornecedor'); 

class VendaController{
    
  static async listar(req, res) {
    try {
      const msg = req.query['2'] ? 'Venda excluída com sucesso!' : null;

      // Usando populate para preencher o fornecedor
      const vendas = await Venda.find().populate('fornecedor'); // Populando fornecedor
      
      // Renderiza a view passando as vendas e a mensagem
      res.render('vendas/listagem', { title: 'Vendas', vendas, msg });
    } catch (err) {
      res.status(500).send('Erro ao carregar vendas: ' + err.message);
    }
  }



static adicionar(req, res){
    res.render('fornecedores/novo');
    }

    static async adicionar(req, res){
        try {
            const fornecedores = await Fornecedor.find(); // Busca os fornecedores para o formulário
            res.render('vendas/nova', { fornecedores }); // Renderiza a página para adicionar nova venda
          } catch (err) {
            res.status(500).send('Erro ao carregar fornecedores: ' + err.message);
          }
    }

    static async adicionarPost(req, res) {
      try {
          const { produto, quantidade, valor, fornecedor, dataVenda } = req.body;
          const valorFormatado = parseFloat(valor).toFixed(2);
          const data = new Date(dataVenda);

          
          
          // Cria a nova venda no banco de dados
          await Venda.create({ produto, quantidade, valor: valorFormatado, fornecedor, dataVenda: data });
          
          // Redireciona para a listagem de vendas com o parâmetro ?3=1
          res.redirect('/vendas?3=1');
      } catch (err) {
          res.status(500).send('Erro ao registrar venda: ' + err.message);
      }
  }

    static async detalhar(req, res){
        try {
            // Buscar a venda pelo ID e populando o fornecedor
            const venda = await Venda.findById(req.params.id).populate('fornecedor');
        
            if (!venda) {
              return res.status(404).send("Venda não encontrada");
            }
        
            res.render('vendas/detalhes', { venda });
          } catch (err) {
            console.error("Erro ao buscar detalhes da venda:", err);
            res.status(500).send("Erro ao buscar detalhes da venda");
          }
    }

    static async deletar(req, res) {
      try {
        const vendaId = req.params.id;
  
        // Exclui a venda com o ID fornecido
        await Venda.findByIdAndDelete(vendaId);
  
        // Redireciona para a lista de vendas com uma mensagem de sucesso
        res.redirect('/vendas?2=1');
      } catch (err) {
        res.status(500).send('Erro ao excluir venda: ' + err.message);
      }
    }
    
    static async editar(req, res) {
        try {
          // Buscar a venda pelo ID
          const venda = await Venda.findById(req.params.id).populate('fornecedor'); // Populate para obter dados do fornecedor
      
          // Se a venda não for encontrada, retorna erro
          if (!venda) {
            return res.status(404).send("Venda não encontrada");
          }
      
          // Buscar todos os fornecedores para preencher o campo de fornecedor
          const fornecedores = await Fornecedor.find();
      
          // Exibe o formulário de edição com os dados da venda e os fornecedores
          res.render('vendas/editar', { venda, fornecedores });
        } catch (err) {
          console.error("Erro ao editar venda:", err);
          res.status(500).send("Erro ao editar venda");
        }
    }

    static async editarPost(req, res) {
        try {
          // Buscar a venda pelo ID
          const venda = await Venda.findById(req.params.id);
      
          // Se a venda não for encontrada, retorna erro
          if (!venda) {
            return res.status(404).send("Venda não encontrada");
          }
      
          // Atualizar os dados da venda
          venda.produto = req.body.produto || venda.produto;
          venda.quantidade = req.body.quantidade || venda.quantidade;
          venda.valor = req.body.valor || venda.valor;
          venda.fornecedor = req.body.fornecedor || venda.fornecedor;
          venda.dataVenda = req.body.dataVenda || venda.dataVenda;
      
          // Salvar as mudanças
          await venda.save();
      
          // Redireciona para a lista de vendas com uma mensagem de sucesso
          res.redirect('/vendas?success=Venda atualizada com sucesso');
        } catch (err) {
          console.error("Erro ao atualizar venda:", err);
          res.status(500).send("Erro ao atualizar venda");
        }
      }
      
    

    
}
module.exports = VendaController;
