import {containerTime, sortTime, containerSmiley} from "./recordConst.js";
let tableRecords = [];
export function setTableRecords() {
    containerSmiley.style.backgroundImage = 'url("img/smiling-face-with-sunglasses_1f60e.png")';
    let youName = prompt('Поздравляем вы виграли', 'User');
    if (youName == null){return}
    let user = {};
    user.name = `${youName}`;
    user.time = `${containerTime.innerHTML}`;
    tableRecords.push(user);
    tableRecords.sort(sortTime);
    containerTime.innerHTML = '0.000';
    saveLocal();
    downloadLocal();
    writeRecords();
}

function writeRecords() {
    let table = document.createElement("table");
    table.className = ("table-records");
    let thNum = document.createElement('th');
    let thName = document.createElement('th');
    let thTime = document.createElement('th');
    thNum.innerText = '№';
    thName.innerText = 'Логин';
    thTime.innerText = 'Время';
    table.appendChild(thNum);
    table.appendChild(thName);
    table.appendChild(thTime);
    document.getElementById('records').textContent = '';
    for (let i = 0; i < tableRecords.length; i++) {
        let tr = document.createElement("tr");
        let tdNum = document.createElement("td");
        tdNum.innerText = i+1;
        let tdName = document.createElement("td");
        tdName.innerText = tableRecords[i].name;
        let tdTime = document.createElement("td");
        tdTime.innerText = tableRecords[i].time;
        tr.appendChild(tdNum);
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        table.appendChild(tr);
    }
    document.getElementById('records').appendChild(table);
}

function saveLocal() {
    localStorage.setItem('todo', JSON.stringify(tableRecords));
}

export let downloadLocal = function () {
    console.log(tableRecords);
    if (localStorage.getItem('todo') != undefined) {
        tableRecords = JSON.parse(localStorage.getItem('todo'));
        writeRecords();
    }
}
