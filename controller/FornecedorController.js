const Fornecedor = require('../models/Fornecedor');

class FornecedorController {

  // Método para listar fornecedores
  static async listar(req, res) {
    try {
      const msg = req.query['2'] ? 'Fornecedor excluído com sucesso!' : null;

      // Busca todos os fornecedores no banco de dados
      const fornecedores = await Fornecedor.find();
      
      // Renderiza a página de listagem com a mensagem de sucesso, se houver
      res.render('fornecedores/listagem', { title: 'Fornecedores', fornecedores, msg });
    } catch (err) {
      res.status(500).send('Erro ao carregar fornecedores: ' + err.message);
    }
  }

  // Método para exibir o formulário de cadastro
  static adicionar(req, res) {
    res.render('fornecedores/novo');
  }

  // Método para adicionar um novo fornecedor
  static async adicionarPost(req, res) {
    try {
        const { nome, cnpj, endereco, telefone } = req.body;
        
        // Cria um novo fornecedor no banco de dados
        await Fornecedor.create({ nome, cnpj, endereco, telefone });
        
        // Redireciona para a listagem de fornecedores com o parâmetro ?3=1
        res.redirect('/fornecedores?3=1');
    } catch (err) {
        res.status(500).send('Erro ao registrar fornecedor: ' + err.message);
    }
}


  // Método para exibir os detalhes de um fornecedor
  static async detalhar(req, res) {
    try {
      const fornecedor = await Fornecedor.findById(req.params.id);
      
      // Se o fornecedor não for encontrado, retorna erro
      if (!fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }

      // Renderiza a página de detalhes do fornecedor
      res.render('fornecedores/detalhes', { title: `Detalhes de ${fornecedor.nome}`, fornecedor });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar fornecedor");
    }
  }

  // Método para excluir um fornecedor
  static async deletar(req, res) {
    try {
      // Busca o fornecedor pelo ID
      const fornecedor = await Fornecedor.findById(req.params.id);

      // Se o fornecedor não for encontrado, retorna erro
      if (!fornecedor) {
        return res.status(404).json({ error: "Fornecedor não encontrado" });
      }

      // Exclui o fornecedor do banco de dados
      await Fornecedor.findByIdAndDelete(req.params.id);

      // Redireciona para a listagem de fornecedores com uma mensagem de sucesso
      res.redirect('/fornecedores?2=1'); // Código de sucesso 2 para exibir a mensagem de sucesso na listagem
    } catch (err) {
      console.error("Erro ao deletar fornecedor:", err);
      res.status(500).json({ error: "Erro ao deletar fornecedor" });
    }
  }

  // Método para editar um fornecedor
  static async editar(req, res) {
    try {
      const fornecedor = await Fornecedor.findById(req.params.id);
      
      // Se o fornecedor não for encontrado, retorna erro
      if (!fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }

      // Exibe o formulário de edição com os dados do fornecedor
      res.render('fornecedores/editar', { fornecedor });
    } catch (err) {
      console.error("Erro ao editar fornecedor:", err);
      res.status(500).send("Erro ao editar fornecedor");
    }
  }

  // Método para atualizar os dados de um fornecedor
  static async editarPost(req, res) {
    try {
      const fornecedor = await Fornecedor.findById(req.params.id);

      // Se o fornecedor não for encontrado, retorna erro
      if (!fornecedor) {
        return res.status(404).send("Fornecedor não encontrado");
      }

      // Atualiza os dados do fornecedor
      fornecedor.nome = req.body.nome || fornecedor.nome;
      fornecedor.cnpj = req.body.cnpj || fornecedor.cnpj;
      fornecedor.endereco = req.body.endereco || fornecedor.endereco;
      fornecedor.telefone = req.body.telefone || fornecedor.telefone;

      // Salva as alterações no banco de dados
      await fornecedor.save();

      // Redireciona para a lista de fornecedores com uma mensagem de sucesso
      res.redirect('/fornecedores?success=Fornecedor atualizado com sucesso');
    } catch (err) {
      console.error("Erro ao atualizar fornecedor:", err);
      res.status(500).send("Erro ao atualizar fornecedor");
    }
  }
}

module.exports = FornecedorController;
