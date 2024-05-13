const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.use(express.json());

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: todos.length + 1, title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PATCH/update a todo
app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    if (todoIndex !== -1) {
        todos[todoIndex].completed = completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
