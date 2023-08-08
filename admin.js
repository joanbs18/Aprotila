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
    .catch((err) => seeLoad());
}

function seeLoad() {
  cloud = document.getElementById("cloud_load");
  cloud.style.display = "flex";
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
    .catch((err) => seeLoad());
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
    .catch((err) => seeLoad());
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
  fetch("http://localhost:3000/mostrarUsuarios", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarUsuarios(datos.results))
    .catch((err) => seeLoad());
}

const mostrarUsuarios = (data) => {
  let tab = "";

  for (var i = 0; i < data.length; i++) {
    
    tab += ` <li class="completed">
    <p>${data[i].Nombre}</p>
    <p>${data[i].Contraseña}</p>
    <i class='bx bx-dots-vertical-rounded'></i>
</li>`;
  }

  document.getElementById("user").innerHTML = tab;
};

