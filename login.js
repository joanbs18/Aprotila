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
  url = `http://localhost:3000/usuarios?Cedula=${cedula}&Contraseña=${contraseña}`;

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
        window.location.href="/ControlVentas.html"
      }else{
        alert("Cedula o Contraseña invalida")
      }
    })
    .catch((err) => console.log(err));
}

/*-----------------------muestra--la--contraseña----------------------*/
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("contraseña");
  var eyeIcon = document.querySelector(".btnverpassword svg");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("icon-tabler-eye");
    eyeIcon.classList.add("icon-tabler-eye-off");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("icon-tabler-eye-off");
    eyeIcon.classList.add("icon-tabler-eye");
  }
}
