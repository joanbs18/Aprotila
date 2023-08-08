tableTrazabilidad();
mostrarPilaDisponibles();
mostrarPilaInactivas();
function tableTrazabilidad() {
  fetch("http://localhost:3000/trazabilidad", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarTrazabilidad(datos.results))
    .catch((err) => seeLoad());
}
var VTrazabilidad = [];
const mostrarTrazabilidad = (data) => {
  let tab = "";
  let Aprobacion = "";
  VTrazabilidad = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormatoT = moment(data[i].Fecha);
    fechaT = fechaConFormatoT.format("YYYY-MM-DD");
    if (data[i].Aprobacion == 1) {
      Aprobacion = "Aprobada";
    } else {
      Aprobacion = "Cancelada";
    }
    tab += `<tr>
        <td data-label="Lote">${data[i].Lote}</td>
        <td data-label="Pila">${data[i].IdPila_fk_Final}</td>
        <td data-label="Tipo Pez">${data[i].TipoPez}</td>
        <td data-label="Cantidad">${data[i].Cantidad}</td>
        <td data-label="Fecha">${fechaT}</td>
        <td>
        <button class="btnUpdate" id="btnUpdate_Trazabilidad"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_Trazabilidad" ><i class="fa-solid fa-trash-can"></i></button>
    </td>
  
        </tr>`;
  }
  document.getElementById("Rtrazabilidad").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_Trazabilidad");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteTrazabilidad(VTrazabilidad[i].IdTrazabilidad);
      tableTrazabilidad();
    });
  }
  // eles2 = document.querySelectorAll("#btnUpdate_Alevines");
  // console.log(eles2);
  // for (let i = 0; i < eles.length; i++) {
  //   eles2[i].addEventListener("click", function () {
  //     UpdateAlevine(VAlevines, i);
  //   });
  // }
};

function addTrazabilidad() {
  tipoPez_Trazabilidad = document.getElementById("tipoPez_Trazabilidad").value;
  Cantidad_trazabilidad = document.getElementById(
    "Cantidad_trazabilidad"
  ).value;

  if (
    tipoPez_Trazabilidad.toString == 0 ||
    Cantidad_trazabilidad.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertTrazabilidad?PilaInicial=${pilaSeleccionada7}&IdPila_fk_Final=${pilaSeleccionada8}&TipoPez=${tipoPez_Trazabilidad}&Cantidad=${Cantidad_trazabilidad}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("ftrazabilidad").style.display = "none";
  tableTrazabilidad();
}

function deleteTrazabilidad(id) {
  try {
    url = `http://localhost:3000/deleteTrazabilidad?Id=${id}`;
    fetch(url, {
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
  tableTrazabilidad();
}

function mostrarPilaDisponibles() {
  fetch("http://localhost:3000/pilasActivas", {
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
  document.getElementById("menupila_trazabilidadFinal").innerHTML = tab;
};

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
  let tab = "";
  tab += `<option disabled selected="">Pilas</option>`;
  for (var i = 0; i < data.length; i++) {
    tab += `<option>${data[i].IdPila}</option>`;
  }
  document.getElementById("menupila_trazabilidadInicial").innerHTML = tab;
};

function fechaTrazabilidad(Pila) {
  fetch(`http://localhost:3000/ultimoTrazabi?Pila=${Pila}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => peces(datos.results))
    .catch((err) => seeLoad());
}

const peces = (data) => {
  console.log(mostrarFecha(data[0].Fecha));
  let totalMuertos = 0;
  for (var i = 0; i < VMortabilidad.length; i++) {
    if (
      VMortabilidad[i].IdPila == data[0].IdPila_fk_Final &&
      mostrarFecha(data[0].Fecha) >= mostrarFecha(VMortabilidad[i].Fecha)
    ) {
      totalMuertos += VMortabilidad[i].Cantidad;
    } else {
      console.log(VMortabilidad[i].IdPila, " ", pilaSeleccionada);
    }
  }
  document.getElementById("Cantidad_trazabilidad").value =
    data[0].Cantidad - totalMuertos;
};

var pilaSeleccionada7;
var optionPila7 = document.getElementById("menupila_trazabilidadInicial");
optionPila7.addEventListener("change", function () {
  pilaSeleccionada7 = optionPila7.options[optionPila7.selectedIndex].text;
  Mortabilidad();
  fechaTrazabilidad(pilaSeleccionada7);
});
var pilaSeleccionada8;
var optionPila8 = document.getElementById("menupila_trazabilidadFinal");
optionPila8.addEventListener("change", function () {
  pilaSeleccionada8 = optionPila8.options[optionPila8.selectedIndex].text;
});

function Mortabilidad() {
  fetch("http://localhost:3000/mortabilidad", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => obtenerMortabilidad(datos.results))
    .catch((err) => seeLoad());
}
var VMortabilidad = [];
const obtenerMortabilidad = (data) => {
  VMortabilidad = data;
};

function mostrarFecha(fecha) {
  var fechaConFormato = moment(fecha);
  fechaArreglada = fechaConFormato.format("YYYY-MM-DD");
  return fechaArreglada;
}
