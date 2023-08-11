function validarlogin() {
  var username = document.getElementById('cedula').value;
  var password = document.getElementById('contraseña').value;

  // Validar que el usuario solo contenga números
  if (!/^\d+$/.test(username)) {
    alert('El usuario solo debe contener números.');
    return false;
  }

  // Validar que la contraseña tenga al menos 8 caracteres
  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    return false;
  }

  Usuario(); // Enviar el formulario si todas las validaciones pasan
}

//Xavier
function Usuario(){
  console.log("hola mundo")
  cedula = document.getElementById("cedula").value;
  contraseña = document.getElementById("contraseña").value;
  url = `http://localhost:3000/usuarios?usuario=${cedula}&contraseña=${contraseña}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => {
      console.log(datos)
      if (datos.mensaje === "Ingresado correctamente"){
        window.location.href="ControlVentas.html"
      }else{
        alert("Cedula o Contraseña invalida")
      }
    })
    .catch((err) => console.log(err));
}

//irio
/*-----------------------muestra--la--contraseña----------------------*/
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("contraseña");
  var toggleButton = document.getElementById("togglePasswordButton");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-off" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
        <path
          d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
        <path d="M3 3l18 18" />
      </svg>`;
      console.log(passwordInput);
  } else {
    passwordInput.type = "password";
    toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
      </svg>`;
  }
}
