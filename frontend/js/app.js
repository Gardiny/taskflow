const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskEndDate = document.getElementById('taskEndDate');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    tasks.forEach((task, index) => {
        const isExpired = task.endDate < today;

        const li = document.createElement('li');
        li.innerHTML = `
            <div style="text-decoration:${task.completed ? 'line-through' : 'none'}; color:${isExpired ? 'red' : 'inherit'}">
                <strong>${task.title}</strong> - ${task.description} <br>
                <small>Início: ${task.startDate} | Fim: ${task.endDate}</small>
            </div>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const endDate = taskEndDate.value;

    if (!title || !description || !endDate) return;

    const startDate = new Date().toISOString().split('T')[0];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, description, startDate, endDate, completed: false });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskTitle.value = '';
    taskDescription.value = '';
    taskEndDate.value = '';
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

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];

    const newTitle = prompt("Novo título:", task.title);
    const newDescription = prompt("Nova descrição:", task.description);
    const newEndDate = prompt("Nova data final (AAAA-MM-DD):", task.endDate);

    if (newTitle && newDescription && newEndDate) {
        task.title = newTitle;
        task.description = newDescription;
        task.endDate = newEndDate;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

addTaskBtn.addEventListener('click', addTask);
loadTasks();
