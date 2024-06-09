const express = require('express');
const app = express();

// Middleware para analisar o corpo das solicitações POST
app.use(express.json());

// Simulando um banco de dados
let cadastros = [
  {
    id: 1,
    nome: 'Henri Ribeiro',
    email: 'henriribeiro@gmail.com',
    fone: '(91) 12345-6789',
    dataNascimento: '06/06/2005',
    cpf: '123.456.789-10'
  }
  // Adicione mais cadastros conforme necessário
];

// Rota para obter todos os cadastros
app.get('/cadastros', (req, res) => {
  res.json(cadastros);
});

// Rota para adicionar um novo cadastro
app.post('/cadastros', (req, res) => {
  const novoCadastro = req.body;
  cadastros.push(novoCadastro);
  res.json(novoCadastro);
});

// Rota para editar um cadastro existente
app.put('/cadastros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cadastroAtualizado = req.body;

  for (let i = 0; i < cadastros.length; i++) {
    if (cadastros[i].id === id) {
      cadastros[i] = cadastroAtualizado;
      return res.json(cadastroAtualizado);
    }
  }

  res.status(404).send('Cadastro não encontrado');
});

// Rota para deletar um cadastro
app.delete('/cadastros/:id', (req, res) => {
  const id = parseInt(req.params.id);

  for (let i = 0; i < cadastros.length; i++) {
    if (cadastros[i].id === id) {
      cadastros.splice(i, 1);
      return res.send('Cadastro deletado com sucesso');
    }
  }

  res.status(404).send('Cadastro não encontrado');
});

// Iniciando o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
