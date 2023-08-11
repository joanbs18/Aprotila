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
        <button type="submit" class="btnTrash" id="btnTrash_Trazabilidad" ><i class="fa-solid fa-trash-can"></i></button>
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
};

function addTrazabilidad() {
  tipoPez_Trazabilidad = document.getElementById("tipoPez_Trazabilidad").value;
  Cantidad_trazabilidad = document.getElementById(
    "Cantidad_trazabilidad"
  ).value;

  if (
    tipoPez_Trazabilidad.toString == 0 ||
    Cantidad_trazabilidad.toString == 0 ||
    !validarPila7 ||
    !validarPila8
  ) {
    alert("Error campos incompletos");
    return;
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
  location.reload();
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
    .catch((err) => console.log(err));
}
var cantidadMaxima=0;
const peces = (data) => {
  console.log(mostrarFecha(data[0].Fecha));
  console.log(data);
  // let totalMuertos = 0;
  // let totalVentas = 0;
  // for (var i = 0; i < VMortabilidad.length; i++) {
  //   if (
  //     VMortabilidad[i].IdPila == data[0].IdPila_fk_Final &&
  //     mostrarFecha(data[0].Fecha) <= mostrarFecha(VMortabilidad[i].Fecha) &&
  //     data[0].IdTrazabilidad == VMortabilidad[i].IdTrazabilidad_fk
  //   ) {
  //     totalMuertos += VMortabilidad[i].Cantidad;
  //   } else {
  //     console.log(VMortabilidad[i].IdPila, " ", pilaSeleccionada7);
  //   }
  // }
  // for (var i = 0; i < Vventas.length; i++) {
  //   if (
  //     Vventas[i].IdPila_fk == data[0].IdPila_fk_Final &&
  //     mostrarFecha(data[0].Fecha) <= mostrarFecha(Vventas[i].Fecha)
  //   ) {
  //     totalVentas += Vventas[i].Tilapia;
  //   }
  // }
  // console.log(totalMuertos);
  // console.log(totalVentas);
  document.getElementById("Cantidad_trazabilidad").value = data[0].Cantidad;
  cantidadMaxima= data[0].Cantidad;

};
var validarPila7 = false;
var pilaSeleccionada7;
var optionPila7 = document.getElementById("menupila_trazabilidadInicial");
optionPila7.addEventListener("change", function () {
  pilaSeleccionada7 = optionPila7.options[optionPila7.selectedIndex].text;
  validarPila7 = true;
  Mortabilidad();
  ventas(pilaSeleccionada7);
  fechaTrazabilidad(pilaSeleccionada7);
});

var validarPila8 = false;
var pilaSeleccionada8;
var optionPila8 = document.getElementById("menupila_trazabilidadFinal");
optionPila8.addEventListener("change", function () {
  pilaSeleccionada8 = optionPila8.options[optionPila8.selectedIndex].text;
  validarPila8 = true;
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
    .catch((err) => console.log(err));
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

function ventas(Pila) {
  fetch(`http://localhost:3000/ultimoVentas?Pila=${Pila}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarData(datos.results))
    .catch((err) => console.log(err));
}

function seeLoad() {
  cloud = document.getElementById("cloud_load");
  cloud.style.display = "flex";
}

var Vventas = [];
const mostrarData = (data) => {
  Vventas = data;
};
function mostrarTras() {
  var Lote = prompt("Ingrese el Lote:", "");
  fetch(`http://localhost:3000/mostrarTrazabilidad?Lote=${Lote}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarTrza(datos.results, Lote))
    .catch((err) => seeLoad());
}

const mostrarTrza = (data, Lote) => {
  let tab = "";
  tab = `<h2> Lote: ${Lote}</h2>`;
  tab += `<h3>Trazabilidad</h3>`;
  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      tab += `<p>Pila Inicial <i class="fa-solid fa-arrow-right fa-beat-fade"></i> ${data[i].Final} Cantidad=(${data[i].Cantidad})</p>`;
    } else {
      tab += `<p><i class="fa-solid fa-arrow-right fa-beat-fade"></i> Pila ${data[i].Final} CantidadPescados=(${data[i].Cantidad}) </p>`;
    }
  }
  document.getElementById("modalTrazabilidad").innerHTML = tab;
};

document
  .getElementById("Cantidad_trazabilidad")
  .addEventListener("input", function () {
    var numeroIngresado = parseInt(this.value);

    if (numeroIngresado > cantidadMaxima) {
      alert("Cantidad maxíma es " + cantidadMaxima);
      document.getElementById("Cantidad_trazabilidad").value = cantidadMaxima;
    } else {
    }
  });
