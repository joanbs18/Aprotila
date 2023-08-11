tableMortabilidad();
mostrarPilaInactivas();
var encargado = JSON.parse(localStorage.getItem("user"));
function tableMortabilidad() {
  fetch("http://localhost:3000/mortabilidad", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarMortabilidad(datos.results))
    .catch((err) => seeLoad());
}
var VMortabilidad = [];
const mostrarMortabilidad = (data) => {
  let tab = "";
  VMortabilidad = data;
  for (var i = 0; i < data.length; i++) {
    tab += `<tr>
      <td data-label="Pila">${data[i].IdPila}</td>
      <td data-label="Cantidad">${data[i].Cantidad}</td>
      <td data-label="Encargado">${data[i].Nombre_Encargado}</td>
      <td data-label="Observaciones">${data[i].Observaciones}</td>
      <td>
      <button class="btnUpdate" id="btnUpdate_Mortabilidad"><i class="fa-solid fa-pen-to-square"></i></button>   
      <button class="btnTrash" id="btnTrash_Mortabilidad" ><i class="fa-solid fa-trash-can"></i></button>
  </td>

      </tr>`;
  }
  document.getElementById("RMortabilidad").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_Mortabilidad");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteMortabilidad(VMortabilidad[i].IdMortabilidad);
      tableMortabilidad();
    });
  }
};

function addMortabilidad() {
  cantidad_mortabilidad = document.getElementById(
    "cantidad_mortabilidad"
  ).value;
  observaciones_mortabilidad = document.getElementById(
    "observaciones_mortabilidad"
  ).value;

  if (
    cantidad_mortabilidad.toString == 0 ||
    observaciones_mortabilidad.toString == 0
  ) {
    alert("Error campos incompletos");
    return;
  }
  url = `http://localhost:3000/insertMortabilidad?Id=${"null"}&IdPila=${pilaSeleccionada3}&Cantidad=${cantidad_mortabilidad}&IdEncargado=${encargado.IdEncargado}&Observaciones=${observaciones_mortabilidad}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  tableMortabilidad();
  document.getElementById("formumortabilidad").style.display = "none";
}

function deleteMortabilidad(Id) {
  try {
    url = `http://localhost:3000/deleteMortabilidad?IdMortabilidad=${Id}`;
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
  tableMortabilidad();
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
  document.getElementById("menupila_mortabilidad").innerHTML = tab;
};

var pilaSeleccionada3;
var optionPila3 = document.getElementById("menupila_mortabilidad");
optionPila3.addEventListener("change", function () {
  pilaSeleccionada3 = optionPila3.options[optionPila3.selectedIndex].text;
  validarPila = true;
})
