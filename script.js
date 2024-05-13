document.addEventListener("DOMContentLoaded", function() {
    const addTodoBtn = document.getElementById('addTodoBtn');
    addTodoBtn.addEventListener('click', addTodo);
    loadTodos(); // Load todos when the page loads
});

function loadTodos() {
    fetch('/todos')
    .then(response => response.json())
    .then(data => {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; // Clear existing todos

        data.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.classList.add('todo-item');
            listItem.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${todo.id})">
                <span>${todo.title}</span>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    });
}

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: todoText,
            completed: false
        })
    })
    .then(response => {
        if (response.ok) {
            todoInput.value = '';
            loadTodos(); // Reload todos after adding a new one
        } else {
            console.error('Failed to add todo');
        }
    })
    .catch(error => {
        console.error('Error adding todo:', error);
    });
}

function toggleComplete(todoId) {
    fetch(`/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: event.target.checked
        })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to toggle todo complete status');
        }
    })
    .catch(error => {
        console.error('Error toggling todo complete status:', error);
    });
}

function deleteTodo(todoId) {
    fetch(`/todos/${todoId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadTodos(); // Reload todos after deleting one
        } else {
            console.error('Failed to delete todo');
        }
    })
    .catch(error => {
        console.error('Error deleting todo:', error);
    });
}
