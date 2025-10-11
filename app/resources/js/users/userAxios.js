// EVENTS

document.addEventListener('DOMContentLoaded', function () {
  initEventListeners();
});


function initEventListeners() {
  const editUserForm = document.getElementById('edit-user-form');
  // const createService = document.getElementById("btnCreateService");
  if (editUserForm) {
    editUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
      UpdateUser();
    });
  }

  // if (createService) {
  //   createService.addEventListener("click", openCreateService);
  // }
}


//REDIRECTIONS
function openCreateService() {
  window.location.href = '/users/create_service';
}


// FUNCTIONS
async function view_users() {

  const messageBox = document.getElementById('message');

  messageBox.textContent = '';
  messageBox.className = '';

  const url = "http://127.0.0.1:8000/users/get_users/";

  const config = {
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(response => {
      console.log("Datos completos recibidos del servidor:", response);
      const users = response.data.resultado;
      console.log("Datos de users:", users);

      if (response.status === 200) {
        const usersTable = document.getElementById('users-table');

        usersTable.innerHTML = '';

        users.forEach(users => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${users[0] !== undefined ? users[0] : users.id}</td>
          <td>${users[1] !== undefined ? users[1] : users.name}</td>
          <td>${users[2] !== undefined ? users[2] : users.last_name}</td>
          <td>${users[3] !== undefined ? users[3] : users.email}</td>
          <td>${users[4] !== undefined ? users[4] : users.document_number}</td>
          <td>${users[5] !== undefined ? users[5] : users.age}</td>
          <td>
             <button class="action-btn edit" onclick='showEditModal(${JSON.stringify(users)})'>Editar</button>
            <button  class="action-btn delete">Eliminar</button>
          </td>
          `;
          usersTable.appendChild(row);
        });

      } else {
        console.error("Respuesta del servidor con código de estado:", response.status);
        messageBox.textContent = "Hubo un problema al obtener los servicios solicitados. Por favor, inténtalo de nuevo más tarde.";
        messageBox.classList.add('error');
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);

      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }

      messageBox.textContent = " Hubo un problema al obtener los servicios solicitados. Por favor, inténtalo de nuevo más tarde.";
      messageBox.classList.add('error');
    });
}


async  function UpdateUser() {
  
   const idElement = document.getElementById('id'); 
  if (!idElement) {
    console.error('ID field not found');
    return; 
  }

  const id = idElement.value;


  const data = {
    name: document.getElementById('name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    document_number: document.getElementById('document_number').value,
    age: document.getElementById('age').value,
  };


  console.log(data);
  axios.put(`http://127.0.0.1:8000/users/update/${id}`, data)
  .then(() => {
    closeModal('EditUserModal');
    view_users(); 
  })
  .catch(err => console.error('Error:', err));
}










