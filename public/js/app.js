const API_BASE = 'http://localhost:3000/api';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
    setupMenuEventListeners();
    setupFormSubmit();
});

// Setup do Menu
function setupMenuEventListeners() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const menu = item.dataset.menu;
            
            if (menu === 'novo-usuario') {
                abrirModalNovoUsuario();
                return;
            }

            // Remove classe active de todos
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');

            // Mostra/esconde sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            const section = document.getElementById(menu);
            if (section) {
                section.classList.add('active');
                if (menu === 'usuarios') {
                    carregarUsuarios();
                }
            }
        });
    });
}

// Carregar Usuários
async function carregarUsuarios() {
    try {
        const response = await fetch(`${API_BASE}/usuarios`);
        const usuarios = await response.json();
        
        // Atualizar tabela
        const tbody = document.getElementById('usuarios-tbody');
        
        if (usuarios.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="text-center">Nenhum usuário cadastrado</td></tr>';
            return;
        }

        tbody.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>
                    <button class="btn btn-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        document.getElementById('usuarios-tbody').innerHTML = 
            '<tr><td colspan="3" class="text-center" style="color: #ef4444;">Erro ao carregar usuários</td></tr>';
    }
}

// Setup do Formulário
function setupFormSubmit() {
    const form = document.getElementById('formNovoUsuario');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await criarUsuario();
    });
}

// Criar Usuário
async function criarUsuario() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, senha })
        });

        if (response.ok) {
            alert('Usuário criado com sucesso!');
            fecharModalNovoUsuario();
            document.getElementById('formNovoUsuario').reset();
            carregarUsuarios();
        } else {
            alert('Erro ao criar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar usuário');
    }
}

// Deletar Usuário
async function deletarUsuario(id) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Usuário deletado com sucesso!');
            carregarUsuarios();
        } else {
            alert('Erro ao deletar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar usuário');
    }
}

// Modal
function abrirModalNovoUsuario() {
    document.getElementById('modalNovoUsuario').classList.add('active');
}

function fecharModalNovoUsuario() {
    document.getElementById('modalNovoUsuario').classList.remove('active');
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalNovoUsuario');
    if (e.target === modal) {
        fecharModalNovoUsuario();
    }
});
