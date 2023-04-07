document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:3000/getAll')
    .then(res => res.json())
    .then(data => loadHTMLtable(data['data']));
});

const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = function(){
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
    fetch('http://localhost:3000/insert',{
        headers:{'Content-type':'application/json'},
        method: 'POST',
        body: JSON.stringify({name:name})
    })
    .then(res => res.json())
    .then(data =>insertRowIntoTable(data['data']));
}

const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function(){
    const searchName = document.querySelector('#search-input').value;
    fetch(`http://localhost:3000/search/${searchName}`)
    .then(res => res.json())
    .then(data =>loadHTMLtable(data['data']));
}


function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const hasTableData = table.querySelector('.no-data');

    let tableHTML = '<tr>';
    
    for(let key in data){
        if(data.hasOwnProperty(key)){
            if(key === 'date_added'){
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHTML+= `<td>${data[key]}</td>`
        }
    }
    tableHTML += `<td><button class='del-row-btn' data-id=${data.id}>Delete</button></td>`;
    tableHTML += `<td><button class='edit-row-btn' data-id=${data.id}>Edit</button></td>`;
    tableHTML += '</tr>';

    if(hasTableData){table.innerHTML = tableHTML;}
    else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
}

document.querySelector('table tbody').addEventListener('click',(event)=>{
    if(event.target.className === 'del-row-btn'){
        deleteRowByID(event.target.dataset.id);
    }
    if(event.target.className === 'edit-row-btn'){
        handleEditRow(event.target.dataset.id);
    }
});


function deleteRowByID(id){
    fetch(`http://localhost:3000/delete/${id}`,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){location.reload();}
    });
}

const updateBtn = document.querySelector('#update-row-btn');

function handleEditRow(id){
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function(){
    const updatedNameInput = document.querySelector('#update-name-input');
    console.log(updatedNameInput.dataset.id);
    fetch('http://localhost:3000/update',{
        method: 'PATCH',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({
            id: updatedNameInput.dataset.id,
            name: updatedNameInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){location.reload();}
    })
};


// Here 'data' argument is array of rows in json form of table 'info'
function loadHTMLtable(data){
    const table = document.querySelector('table tbody');
    if(data.length === 0){
        return table.innerHTML = `<tr><td class='no-data' colspan='5'>No Data</td></tr>`;
    }
    let tableHTML = "";
    data.forEach(({id,name,date_added}) => {
        tableHTML += `<tr>`;
        tableHTML += `<td>${id}</td>`;
        tableHTML += `<td>${name}</td>`;
        tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHTML += `<td><button class='del-row-btn' data-id=${id}>Delete</button></td>`;
        tableHTML += `<td><button class='edit-row-btn' data-id=${id}>Edit</button></td>`;
        tableHTML += `<tr>`;
    });
    table.innerHTML = tableHTML;
}