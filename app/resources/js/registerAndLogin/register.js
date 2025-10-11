document.addEventListener('DOMContentLoaded', function () {
  initEventListeners();
});


function initEventListeners() {
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      register_usuario();
    });
  }

}

// REDIRECTIONS

function redirectToLogin() {
  window.location.href = '/users/login';
}


async function register_usuario() {

  const name = document.getElementById('name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const document_number = document.getElementById('document_number').value;
  const age = document.getElementById('age').value;
  const password = document.getElementById('password').value;
  const role_id = parseInt(document.getElementById('role_id').value, 10);
  const messageBox = document.getElementById('message');

  messageBox.textContent = '';
  messageBox.className = '';


  if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert("Por favor, completa todos los campos del formulario.");
    return;
  }
  console.log('role_id',role_id);

  const requestData = {
    name: name,
    last_name: last_name || null,
    email: email,
    document_number: document_number || null,
    age: age || null,
    password: password,
    role_id: role_id,
  };


  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/users/create_user',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestData,
  };



  try {
    const response = await axios(config);
    const data = response.data;

    if (response.status === 200) {

      messageBox.textContent = "Usuario registrado exitosamente";
      messageBox.classList.add('success');
      document.getElementById('register-form').reset();

    } else {

      messageBox.textContent = response.data.message || "Error desconocido";
      messageBox.classList.add('error');

    }
  } catch (error) {

    console.error("Error al registrar usuario:", error);
    messageBox.textContent = "Hubo un error durante el registro.";
    messageBox.classList.add('error');
  }

}