const clock = document.querySelector('#time');
const dateEl = document.querySelector('#date');
setInterval(function () {
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
    dateEl.innerHTML = now.toDateString();
}, 1000);

// Task manager
const taskInput = document.querySelector('#taskInput');  // input field
const addBtn = document.querySelector('#addTaskBtn');    // Add button
const taskList = document.querySelector('#taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Complete';
    delBtn.className = 'delete-btn';

    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = ''; // clear input
    saveTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Handle clicks on task list
taskList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
        li.remove();
    } else {
        li.classList.toggle('completed');
    }
    saveTasks();
});

// Local storage
function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.childNodes[0].textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Completed';
        delBtn.className = 'delete-btn';

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
    
}

// Load tasks when page reloads
window.addEventListener('load', loadTasks);
