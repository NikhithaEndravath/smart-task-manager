let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    // ✅ Show message if no tasks
    if(tasks.length === 0){
        list.innerHTML = "<p>No tasks yet</p>";
        return;
    }

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <span class="delete" onclick="deleteTask(${index})">✖</span>
        `;

        list.appendChild(li);
    });
}

function addTask(){
    let input = document.getElementById("taskInput");

    let value = input.value.trim();

    // ✅ Prevent empty input
    if(value === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({text: value, completed: false});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// ✅ Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

// ✅ Load tasks on page load
renderTasks();