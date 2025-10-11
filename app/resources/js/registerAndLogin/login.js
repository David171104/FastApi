document.addEventListener('DOMContentLoaded', function () {
  initEventListeners();
});


function initEventListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      login_usuario();
    });
  }
}




// REDIRECTIONS

function redirectToUserPanel(role_id) {
  const messageBox = document.getElementById('message');

  messageBox.textContent = '';
  messageBox.className = '';
  console.log('rol', role_id);
  if(role_id == 2){

    window.location.href = '/users/technicianPanel';
  }else if(role_id == 3){

    window.location.href = '/users/userPanel';
  }

  if(!role_id){
    messageBox.textContent = "Algo salio mal, error";
    messageBox.classList.add('error');
  }

  messageBox.textContent = "Inicio de sesion exitoso";
  messageBox.classList.add('success');
}

async function login_usuario() {
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;
  const messageBox = document.getElementById('message');

  messageBox.textContent = '';
  messageBox.className = '';

  if (email === '' || password === '') {
    messageBox.textContent = "Por favor, completa todos los campos.";
    messageBox.classList.add('error');
    return;
  }

  const requestData = {
    email: email,
    password: password,
  };


  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/users/user_login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestData,
  };


  try {
    const response = await axios(config);
    const data = response.data;

console.log('data', data);
    if (response.status === 200) {
      messageBox.textContent = "Inicio de sesion exitoso";
      messageBox.classList.add('success');
      redirectToUserPanel(data.user.role_id);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      messageBox.textContent = "Correo o contraseña incorrectos";
      messageBox.classList.add('error');
    } else {
      messageBox.textContent = "Hubo un error durante el login.";
      messageBox.classList.add('error');
    }
  }
}
