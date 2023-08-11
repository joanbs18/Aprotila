tableMuestreo();
mostrarPilaInactivas();
var encargado = JSON.parse(localStorage.getItem("user"));
function tableMuestreo() {
  fetch("http://localhost:3000/muestreo", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarMuestreo(datos.results))
    .catch((err) => seeLoad());
}
var VMuestreo = [];
const mostrarMuestreo = (data) => {
  let tab = "";
  let Aprobacion = "";
  VMuestreo = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormatoM = moment(data[i].Fecha);
    fechaM = fechaConFormatoM.format("YYYY-MM-DD");
    if (data[i].Aprobacion == 1) {
      Aprobacion = "Aprobada";
    } else {
      Aprobacion = "Cancelada";
    }
    tab += `<tr>
        <td data-label="Lote">${data[i].IdPila_fk}</td>
        <td data-label="Pila Inicial">${data[i].Cantidad}</td>
        <td data-label="Fecha">${fechaM}</td>
        <td data-label="Peso">${data[i].Peso}</td>
        <td data-label="Encargado">${data[i].Nombre}</td>
        <td data-label="Aprobación">${Aprobacion}</td>
        <td>
        <button class="btnUpdate" id="btnUpdate_Muestreo"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_Muestreo" ><i class="fa-solid fa-trash-can"></i></button>
    </td>
  
        </tr>`;
  }
  document.getElementById("Rmuestreo").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_Muestreo");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteMuestreo(VMuestreo[i].IdMuestreo);
      tableMuestreo();
      mostrarPilaInactivas();
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

function addMuestreo() {
  cantidad_muestreo = document.getElementById("cantidad_muestreo").value;
  peso_muestreo = document.getElementById("peso_muestreo").value;

  observaciones_muestreo = document.getElementById(
    "observaciones_muestreo"
  ).value;
  var aprobado = 0;
  if (aprobacionSeleccionado == "SÍ") {
    aprobado = 1;
  } else {
    aprobado = 0;
  }
  console.log(aprobado);

  if (cantidad_muestreo.toString == 0 || peso_muestreo.toString == 0) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertMuestreo?Pila=${pilaSeleccionada8}&Cantidad=${cantidad_muestreo}&Peso=${peso_muestreo}&IdEncargado=${encargado.IdEncargado}&Aprobacion=${aprobado}&Observaciones=${observaciones_muestreo}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("fmuestreo").style.display = "none";
  tableMuestreo();
  mostrarPilaInactivas();
}
var aprobacionSeleccionado;
var optionAprobado = document.getElementById("aprobacion_muestreo");
optionAprobado.addEventListener("change", function () {
  aprobacionSeleccionado =
    optionAprobado.options[optionAprobado.selectedIndex].text;
});
function deleteMuestreo(id) {
  try {
    url = `http://localhost:3000/deleteMuestreo?Id=${id}`;
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
  tableMuestreo();
  mostrarPilaInactivas();
}

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
  document.getElementById("menupila_muestreo").innerHTML = tab;
};

var pilaSeleccionada8;
var optionPila8 = document.getElementById("menupila_muestreo");
optionPila8.addEventListener("change", function () {
  pilaSeleccionada8 = optionPila8.options[optionPila8.selectedIndex].text;
});
