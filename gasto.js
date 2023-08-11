//INICIALIZADOR
Inventario();
tablegasto();
mostrarPilaDisponibles();
var encargado = JSON.parse(localStorage.getItem("user"));
function tablegasto() {
  fetch("http://localhost:3000/gastos", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarGastos(datos.results))
    .catch((err) => console.log());
}
var Vgasto = [];
const mostrarGastos = (data) => {
  let tab = "";
  Vgasto = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormato = moment(data[i].Fecha);
    fechaa = fechaConFormato.format("YYYY-MM-DD");
    tab += `<tr>
        <td data-label="Encargado">${data[i].Encargado}</td>
        <td class="last" data-label="Fecha">${fechaa}</td>
        <td class="last" data-label="Tipo Concentrado">${data[i].Ingreso}</td>
        <td data-label="Pila">${data[i].Pila}</td>
        <td data-label="Cantidad Kilos">${data[i].Kilos}</td>
        <td>
        <button class="btnUpdate" id="btnUpdate_Gasto"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_Gasto" ><i class="fa-solid fa-trash-can"></i></button>
    </td>
    </tr>`;
  }
  document.getElementById("RGasto").innerHTML = tab;

  eles = document.querySelectorAll("#btnTrash_Gasto");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteGasto(Vgasto[i].IdGasto);
    });
  }
};

function addGasto() {
  total_gasto = document.getElementById("total_gasto").value;

  if (total_gasto.toString == 0) {
    alert("Error campos incompletos");
    return;
  }
  url = `http://localhost:3000/insertGasto?IdGasto=${1}&IdEncargado=${
    encargado.IdEncargado
  }&Tipo=${tipoSeleccionado}&IdPila=${pilaSeleccionada}&Total=${total_gasto}`;
  console.log(url);
  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => alert(datos))
    .catch((err) => console.log(err));

  document.getElementById("formugasto").style.display = "none";
  tablegasto();
}

function deleteGasto(id) {
  try {
    fetch(`http://localhost:3000/deleteGasto?id=${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => console.log(datos))
      .catch((err) => console.log(err));
  } catch (error) {
    alert("Error Inesperado");
  }
  tablegasto();
}

function mostrarPilaDisponibles() {
  fetch("http://localhost:3000/pilas", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarPilasDisponibles(datos.results))
    .catch((err) => seeLoad());
}

const mostrarPilasDisponibles = (data) => {
  let tab = "";
  tab += `<option disabled selected="">Pilas Disponibles</option>`;
  for (var i = 0; i < data.length; i++) {
    tab += `<option>${data[i].IdPila}</option>`;
  }
  document.getElementById("menupila_gasto").innerHTML = tab;
};

function selectTipoIngreso() {
  fetch("http://localhost:3000/tiposIngreso", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarselectTipoIngreso(datos.results))
    .catch((err) => console.log("Error con el select"));
}
var Vtipo_Ingreso = [];
const mostrarselectTipoIngreso = (data) => {
  Vtipo_Ingreso = data;
  let tab = "";
  tab += `<option disabled selected="">Tipo Ingreso</option>`;
  for (var i = 0; i < data.length; i++) {
    tab += `<option>${data[i].Nombre}</option>`;
  }
  document.getElementById("select_tipoIngreso_Gasto").innerHTML = tab;
};

function Inventario() {
  fetch("http://localhost:3000/inventario", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarInve(datos.results))
    .catch((err) => console.log(err));
}
var Vinve = [];
const mostrarInve = (data) => {
  Vinve = data;
};

var validarPila = false;
var pilaSeleccionada;
let optionPila = document.getElementById("menupila_gasto");
optionPila.addEventListener("change", function () {
  pilaSeleccionada = optionPila.options[optionPila.selectedIndex].text;
  validarPila = true;
});
var validarTipo = false;
var tipoSeleccionado;
let optionTipo = document.getElementById("select_tipoIngreso_Gasto");
optionTipo.addEventListener("change", function () {
  let unidad = "";
  tipoSeleccionado = optionTipo.options[optionTipo.selectedIndex].text;
  unidad = encontrarMedida(tipoSeleccionado);
  encontrarMaximo(tipoSeleccionado);
  document.getElementById("cantidad_gasto").innerText = `Total en ${unidad}`;
  validarTipo = true;
});

function seeLoad() {
  cloud = document.getElementById("cloud_load");
  cloud.style.display = "flex";
}

function encontrarMedida(tipo) {
  for (let i = 0; i < Vtipo_Ingreso.length; i++) {
    if (Vtipo_Ingreso[i].Nombre == tipo) {
      return Vtipo_Ingreso[i].Unidad_Medida;
    }
  }
}
var valorMaximoInve;
function encontrarMaximo(tipo) {
  for (let i = 0; i < Vinve.length; i++) {
    if (Vinve[i].TipoIngreso == tipo) {
      valorMaximoInve = Vinve[i].CantidadDisponible;
      return;
    }
  }
}

document
  .getElementById("total_gasto")
  .addEventListener("input", function () {
    var numeroIngresado = parseInt(this.value);

    if (numeroIngresado > valorMaximoInve) {
      alert("Cantidad maxíma es " + valorMaximoInve);
      document.getElementById("Cantidad_trazabilidad").value = valorMaximoInve;
    } else {
    }
  });
