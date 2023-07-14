
document.querySelector('form').addEventListener('submit', function(event) {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    
    var username = usernameInput.value;
    
    if (!/^\d+$/.test(username)) {
      alert('El usuario solo puede contener números.');
      event.preventDefault(); 
      return;
    }

    if (username.length < 9) {
      alert('El usuario debe tener al menos 9 caracteres.');
      event.preventDefault(); 
      return;
    }
    var password = passwordInput.value;
    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      event.preventDefault(); 
      return;
    }
});