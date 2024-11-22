// Select the DOM elements
const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskText => {
    addTask(taskText);
  });
}

// Event listener for adding tasks
addButton.addEventListener('click', addTask);

// Function to add a new task
function addTask(taskText) {
  if (!taskText) {
    taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
  }

  // Create a new list item
  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  
  // Create text node and add it to the list item
  const taskNode = document.createTextNode(taskText);
  listItem.appendChild(taskNode);
  
  // Create a remove button for each task
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => taskList.removeChild(listItem));
  
  // Append the remove button to the list item
  listItem.appendChild(removeButton);

  // Add the task to the list
  taskList.appendChild(listItem);

  // Clear the input
  taskInput.value = '';

  // Save the updated task list
  saveTasks();
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => tasks.push(item.textContent.replace('Remove', '').trim()));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for marking tasks as completed
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
});
