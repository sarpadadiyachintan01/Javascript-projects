
let allTasks = JSON.parse(localStorage.getItem('app_tasks')) || [];
let editModeId = null;


const saveBtn = document.getElementById('saveTaskBtn');
const tasksGrid = document.getElementById('tasksGrid');


saveBtn.addEventListener('click', () => {
    const title = document.getElementById('inpTitle').value;
    const date = document.getElementById('inpDate').value;
    const desc = document.getElementById('inpDesc').value;
    const priority = document.getElementById('inpPriority').value;

    if (!title || !date) return alert("Title and Date are required!");

    if (editModeId) {
       
        const idx = allTasks.findIndex(t => t.id === editModeId);
        allTasks[idx] = { id: editModeId, title, date, desc, priority };
        editModeId = null;
        saveBtn.innerText = "Save Task";
    } else {
        
        const taskObj = { id: Date.now(), title, date, desc, priority };
        allTasks.push(taskObj);
    }

    updateApp();
    clearInputs();
});


function renderTasks() {
    const searchTxt = document.getElementById('searchBar').value.toLowerCase();
    const filterVal = document.getElementById('filterBy').value;

    tasksGrid.innerHTML = "";

    allTasks.forEach(item => {
        if ((filterVal === 'all' || item.priority === filterVal) && 
            (item.title.toLowerCase().includes(searchTxt))) {
            
            const card = document.createElement('div');
            card.className = `task-node ${item.priority}`;
            card.innerHTML = `
                <h4>${item.title}</h4>
                <p style="font-size:13px; color:gray;">${item.date}</p>
                <p style="margin:10px 0;">${item.desc}</p>
                <div class="node-btns">
                    <button onclick="prepareEdit(${item.id})">Edit</button>
                    <button class="del-btn" onclick="removeItem(${item.id})">Delete</button>
                </div>
            `;
            tasksGrid.appendChild(card);
        }
    });
}


function removeItem(id) {
    allTasks = allTasks.filter(t => t.id !== id);
    updateApp();
}


function prepareEdit(id) {
    const target = allTasks.find(t => t.id === id);
    document.getElementById('inpTitle').value = target.title;
    document.getElementById('inpDate').value = target.date;
    document.getElementById('inpDesc').value = target.desc;
    document.getElementById('inpPriority').value = target.priority;

    editModeId = id;
    saveBtn.innerText = "Update Task";
}


function updateApp() {
    localStorage.setItem('app_tasks', JSON.stringify(allTasks));
    renderTasks();
}


function clearInputs() {
    document.getElementById('inpTitle').value = "";
    document.getElementById('inpDate').value = "";
    document.getElementById('inpDesc').value = "";
}


document.getElementById('searchBar').addEventListener('input', renderTasks);
document.getElementById('filterBy').addEventListener('change', renderTasks);


renderTasks();