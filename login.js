function validarlogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

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

  return true; // Enviar el formulario si todas las validaciones pasan
}