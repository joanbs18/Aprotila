mostrarPilaDisponibles();
tableAlevines();
selectProveedor();



function tableAlevines() {
  fetch("http://localhost:3000/alevines", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarAlevines(datos.results))
    .catch((err) => console.log(err));
}
var VAlevines = [];
const mostrarAlevines = (data) => {
  let tab = "";
  VAlevines = data;
  for (var i = 0; i < data.length; i++) {
    tab += `<tr>
        <td data-label="Proveedor">${data[i].NombreProveedor}</td>
        <td data-label="Lote Proveedor">${data[i].Lote_Provedor}</td>
        <td data-label="Pila Proveedor">${data[i].Nombre_Encargado}</td>
        <td data-label="Lote Aprotila">${data[i].LoteAprotila}</td>
        <td data-label="Pila">${data[i].PilaAprotila}</td>
        <td data-label="Encargado">${data[i].Nombre_Encargado}</td>
        <td data-label="Especie">${data[i].EspeciePescado}</td>
        <td data-label="Cantidad">${data[i].Cantidad}</td>
        <td data-label="Fecha">${mostrarFecha(data[i].Fecha)}</td>
        <td>
        <button class="btnUpdate" id="btnUpdate_Alevines"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_Alevines" ><i class="fa-solid fa-trash-can"></i></button>
    </td>
  
        </tr>`;
  }
  document.getElementById("RAlevines").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_Alevines");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteAlevine(VAlevines[i].IdAlevines);
      tableAlevines();
    });
  }
  eles2 = document.querySelectorAll("#btnUpdate_Alevines");
  console.log(eles2);
  for (let i = 0; i < eles.length; i++) {
    eles2[i].addEventListener("click", function () {
      UpdateAlevine(VAlevines, i);
    });
  }
};

function addAlevine() {
  loteProvedor = document.getElementById("loteProvedor").value;
  pilaProvedor = document.getElementById("pilaProvedor").value;
  loteAprotila = document.getElementById("loteAprotila").value;
  Especie = document.getElementById("Especie").value;
  cantidad_Alevines = document.getElementById("cantidad_Alevines").value;

  if (
    loteProvedor.toString == 0 ||
    Especie.toString == 0 ||
    cantidad_Alevines.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertAlevines?IdProvedor=${idProveedor}&Lote_Provedor=${loteProvedor}&Pila_Provedor=${pilaProvedor}&LoteAprotila=${loteAprotila}&IdPila=${pilaSeleccionada}&IdEncargado=${1}&Especie=${Especie}&Cantidad=${cantidad_Alevines}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  tableAlevines();

  document.getElementById("formualevines").style.display = "none";
}

function deleteAlevine(id) {
  try {
    url = `http://localhost:3000/deleteAlevines?Id=${id}`;
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
  tableAlevines();
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
  document.getElementById("menupila_alevines").innerHTML = tab;
};


var pilaSeleccionada;
var optionPila = document.getElementById("menupila_alevines");
optionPila.addEventListener("change", function () {
    pilaSeleccionada = optionPila.options[optionPila.selectedIndex].text;

});


function selectProveedor() {
    fetch("http://localhost:3000/nombreProveedores", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => mostrarselectProveedor(datos.results))
      .catch((err) => console.log(err));
  }
  var SelectProveedor=[]
  const mostrarselectProveedor = (data) => {
    SelectProveedor=data;
    let tab = "";
    tab += `<option disabled selected="">Nombre Proveedor</option>`;
    for (var i = 0; i < data.length; i++) {
      tab += `<option>${data[i].NombreProveedor} - ${data[i].TipoProveedor}</option>`;
    }
    document.getElementById("Proveedor_Alevines").innerHTML = tab;
  };


var proveedor_select;
let Proveedor_Alevines = document.getElementById("Proveedor_Alevines");
Proveedor_Alevines.addEventListener("change", function () {
  proveedor_select =Proveedor_Alevines.options[Proveedor_Alevines.selectedIndex].text;
  obtenerIdProveedor(proveedor_select);
});


function obtenerIdProveedor(NombreP) {
  const partes = NombreP.split(" - "); // Dividir la cadena en dos partes usando el guion como separador
  const Nombre = partes[0]; // Obtener la primera parte resultante (en este caso, "Dos Pinos")
  const Tipo = partes[1];

  fetch(`http://localhost:3000/IdProveedor?Nombre=${Nombre}&Tipo=${Tipo}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => almacenarIdProveedor(datos.results))
    .catch((err) => seeLoad());
}
var idProveedor;
const almacenarIdProveedor = (data) => {
  idProveedor=data[0].IdProveedores;
};


function seeLoad() {
    cloud = document.getElementById("cloud_load");
    cloud.style.display = "flex";
  }
  function mostrarFecha(fecha) {
    var fechaConFormato = moment(fecha);
    fechaArreglada = fechaConFormato.format("YYYY-MM-DD");
    return fechaArreglada;
  }