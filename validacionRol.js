var dashboard = document.getElementById("dashboard");
var encargado = JSON.parse(localStorage.getItem("user"));
if (encargado == null) {
  window.location.href = "login.html";
  alert("Porfavor inicia sesion");
}
document.getElementById("nombreEncargado").textContent =
  encargado.Nombre_Encargado;
 
console.log(encargado)
var rol;
var borrarLocalStorage = document.getElementById("exit");



if (encargado.IdCargo_fk == 2) {
  dashboard.style.display = "none";
  rol = "Trabajador";
} else {
  rol = "Administrador";
}

document.getElementById("rol").textContent = rol;

borrarLocalStorage.addEventListener("click", function () {
  window.location.href = "login.html";
  localStorage.clear();
});
