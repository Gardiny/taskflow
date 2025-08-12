const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// > Caminho ajustado para funcionar corretamente <
const db = new sqlite3.Database('./database/tasks.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Banco de dados conectado com sucesso!!');
    }
});

// > Criação da tabela, se não existir <
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`);

// > Listar todas as tarefas <
router.get('/', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// > Adicionar nova tarefa <
router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
    }
    db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, completed: 0 });
    });
});

// > Atualizar tarefa <
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    db.run("UPDATE tasks SET title = ?, completed = ? WHERE id = ?", 
        [title, completed ? 1 : 0, id], 
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
});

// >Deletar tarefa<
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
