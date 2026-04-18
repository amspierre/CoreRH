const usuariosService = require('../services/usuariosService');

async function criarUsuario(req, res) {
    try {
        const { nome, senha } = req.body;
        const novoUsuario = await usuariosService.criarUsuario(nome, senha);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuariosService.listarUsuarios();
    res.json(usuarios);
    } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;          
    const { nome, senha } = req.body;
    const usuarioAtualizado = await usuariosService.atualizarUsuario(id, nome, senha);
    if (usuarioAtualizado) {
      res.json(usuarioAtualizado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
    } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

async function excluirUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioExcluido = await usuariosService.excluirUsuario(id);
    if (usuarioExcluido) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}
module.exports = {
    criarUsuario,
    listarUsuarios,
    atualizarUsuario,
    excluirUsuario
};