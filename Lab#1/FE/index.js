function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => {
          deleteEmployee(item.id);
        });
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', (event) => {
  event.preventDefault;
  createEmployee();
});

// TODO
// add event listener to delete button
// done in fetchEmployee

// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  if (!name || !id) {
    alert('Please enter a name and ID.');
    return;
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name })
  })
  .then(response => response.json())
  .then(() => {
    fetchEmployees();
    document.getElementById('employeeForm').reset();
  })
  .catch(error => console.error(error));
}

// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(() => fetchEmployees()) // Refresh table after deletion
  .catch(error => console.error(error));
}

fetchEmployees()
