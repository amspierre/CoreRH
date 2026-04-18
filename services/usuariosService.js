const pool = require('../database/db');

async function criarUsuario(nome, senha) {
    const result = await pool.query(
        'INSERT INTO usuarios (nome, senha) VALUES ($1, $2) RETURNING id',
        [nome, senha]
    );
    return { id: result.rows[0].id, nome, senha };
}

async function listarUsuarios() {
    const result = await pool.query('SELECT id, nome, senha, criado_em FROM usuarios ORDER BY id');
    return result.rows;
}

async function atualizarUsuario(id, nome, senha) {
    const result = await pool.query(
        'UPDATE usuarios SET nome = $1, senha = $2 WHERE id = $3 RETURNING id, nome, senha',
        [nome, senha, id]
    );
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
}

async function excluirUsuario(id) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return result.rowCount > 0;
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    atualizarUsuario,
    excluirUsuario
};