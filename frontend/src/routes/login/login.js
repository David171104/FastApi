import axios from 'axios';
import Swal from 'sweetalert2';
import { goto } from '$app/navigation';
import { isAuthenticated } from '$lib/stores/auth.js';

export async function login_user(event) {
  event.preventDefault();

  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/users/user_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      throw new Error(`Error ${response.status}: ${errorData.detail || "Error desconocido"}`);
    }

    const data = await response.json();
    
    console.log("Login exitoso:", data);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    isAuthenticated.set(true);
    
    Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido, ${data.user.name}`,
        showConfirmButton: false,
        timer: 2000
    });


    if (data.user.role_id === 1) {
      goto("/users/admin");
    } else if (data.user.role_id === 2) {
        goto("/users/technician");
    } else if (data.user.role_id === 3) {
        goto("/users/client");
    } else {
      goto("/");
    }

  } catch (error) {
    console.error("Error en login:", error);
    Swal.fire({
      icon: "error",
      title: "Error de inicio de sesión",
      text: error.message
    });
  }
}


