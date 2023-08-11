ver();
muestreo();
verUsuarios();
function ver() {
  fetch("http://localhost:3000/controlventa", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarData(datos.results))
    .catch((err) => console.log(err));
}

var ventasDelete = [];
const mostrarData = (data) => {
  ventasDelete = data;
  let ventasTotales = data.length;
  let dineroTotal = 0;
  let body = "";

  for (var i = 0; i < data.length; i++) {
    dineroTotal += data[i].Precio;
  }

  console.log(dineroTotal);
  document.getElementById("DineroTotal").innerHTML = `<h3>$ ${dineroTotal}</h3>
  <p>Dinero Total</p>`;
  document.getElementById(
    "ventasTotales"
  ).innerHTML = `<h3> ${ventasTotales}</h3>
  <p>Ventas Totales</p>`;
};
mostrarPilaInactivas();
function mostrarPilaInactivas() {
  fetch("http://localhost:3000/pilasInactivas", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarPilasInactivas(datos.results))
    .catch((err) => console.log(err));
}

const mostrarPilasInactivas = (data) => {
  document.getElementById(
    "pilasActivas"
  ).innerHTML = `<h3>${data.length}</h3><p>Pilas Ocupadas<p>`;
};

function muestreo() {
  fetch("http://localhost:3000/muestreoEstados", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => muestreoEstados(datos.results))
    .catch((err) => console.log(err));
}
const muestreoEstados = (data) => {
  let tab = "";
  let aprobado = '<span class="status completed">Completado</span>';
  let desaprobado = '<span class="status pending">Pendiente</span>';
  let estado = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].Aprobacion == 1) {
      estado = aprobado;
    } else {
      estado = desaprobado;
    }
    tab += ` <tr><td>

          <p>${data[i].IdPila_fk}</p>
      </td>
      <td>
          <p>${data[i].Lote}</p>
      </td>
      <td>${mostrarFecha(data[i].Fecha)}</td>
      <td>${estado}</td>
  </tr>`;
  }

  document.getElementById("muestreos").innerHTML = tab;
};

function mostrarFecha(fecha) {
  var fechaConFormato = moment(fecha);
  fechaArreglada = fechaConFormato.format("YYYY-MM-DD");
  return fechaArreglada;
}

function verUsuarios() {
  fetch("http://localhost:3000/mostrarEncargados", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarUsuarios(datos.resultado))
    .catch((err) => console.log(err));
}

const mostrarUsuarios = (data) => {
  let tab = "";

  for (var i = 0; i < data.length; i++) {
    tab += ` <li class="completed">
    <p>${data[i].Nombre_Encargado}</p>
    <p>${data[i].Contraseña}</p>
    <i class='bx bx-dots-vertical-rounded'></i>
</li>`;
  }

  document.getElementById("user").innerHTML = tab;
};

function addUser() {
  nombreencargado_user = document.getElementById("nombreencargado_user").value;
  cedula_user = document.getElementById("cedula_user").value;
  num_telefono = document.getElementById("num_telefono").value;
  contraseña_user = document.getElementById("contraseña_user").value;

  if (
    nombreencargado_user.toString == 0 ||
    cedula_user.toString == 0 ||
    num_telefono.toString == 0 ||
    !verficarElegido ||
    contraseña_user.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  let roll;

  if (rolElegido == "Administrador") {
    roll = 1;
  } else {
    roll = 2;
  }

  url = `http://localhost:3000/insertUser?Nombre=${nombreencargado_user}&Cedula=${cedula_user}&Contraseña=${contraseña_user}&Telefono=${num_telefono}&Rol=${roll}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  verUsuarios();

  document.getElementById("fusuario").style.display = "none";
}

var verficarElegido = false;
var rolElegido;
var optionRol = document.getElementById("rol_elegido");
optionRol.addEventListener("change", function () {
  rolElegido = optionRol.options[optionRol.selectedIndex].text;
  verficarElegido = true;
});
