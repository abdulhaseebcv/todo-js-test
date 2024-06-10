// Load the todo list from localStorage
const storedTodos = localStorage.getItem('todos');
const todos = storedTodos ? JSON.parse(storedTodos) : [];

// Function to save the todo list to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

// Function to toggle the status of a todo item
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Function to edit the text of a todo item
function editTodo(index) {
    const newInputText = prompt('Edit your todo:', todos[index].text);
    if (newInputText !== null) {
        todos[index].text = newInputText.trim();
        saveTodos();
        renderTodos();
    }
}

// Function to delete a todo item
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Function to render all todo items
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item${todo.completed ? ' completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleTodo(${index})">
            <p>${todo.text}</p>
            <div>
                <button onclick="editTodo(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTodo(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Initial rendering of todos
renderTodos();