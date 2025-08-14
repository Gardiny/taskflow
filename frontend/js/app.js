const taskInput = document.getElementById('taskTitle');
const taskEndDateInput = document.getElementById('taskEndDate');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date();

    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (task.endDate && new Date(task.endDate) < today) {
            task.completed = true;
        }
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.title}
                <br>
                📅 Início: ${task.startDate} | Final: ${task.endDate || 'Não definido'}
            </span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const title = taskInput.value.trim();
    const endDate = taskEndDateInput.value;
    if (!title) return;
    const startDate = new Date().toLocaleDateString('pt-BR');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, completed: false, startDate, endDate });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    taskEndDateInput.value = '';
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

addTaskBtn.addEventListener('click', addTask);
loadTasks();
