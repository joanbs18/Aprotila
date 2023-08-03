Ingresos(); //LLAMADA INICIAL

//MUESTRA LOS DATOS DE INGRESO EN LA TABLA
function Ingresos() {
  fetch("http://localhost:3000/ingresos", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarIngresos(datos.results))
    .catch((err) => seeLoad());
}
var Vingreso = [];
const mostrarIngresos = (data) => {
  let tab = "";
  Vingreso = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormato1 = moment(data[i].Fecha_Compra);
    var fechaConFormato2 = moment(data[i].Fecha_Vencimiento);
    fecha1 = fechaConFormato1.format("YYYY-MM-DD");
    fecha2 = fechaConFormato2.format("YYYY-MM-DD");
    tab += `<tr>
        <td data-label="Tipo">${data[i].Tipo}</td>
        <td data-label="Marca">${data[i].Marca}</td>
        <td data-label="Compra">${fecha1}</td>
        <td data-label="Vencimiento">${fecha2}</td>
        <td data-label="Proveedor">${data[i].Proveedor}</td>
        <td data-label="Precio">${data[i].Precio}</td>
        <td data-label="Cantidad">${data[i].Cantidad}</td>
        <td data-label="Descripción">${data[i].Descripcion}</td>
        <td data-label="Acción">
        <button class="btnUpdate" id="btnUpdate_ingreso"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_ingreso" ><i class="fa-solid fa-trash-can"></i></button>
        </td>
        </tr>`;
  }
  document.getElementById("RingresoS").innerHTML = tab;
  eles = document.querySelectorAll("#btnUpdate_ingreso");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteConcentrado(Vingreso[i].IdIngreso);
    });
  }
};

//INSERTA DATOS EN INGRESO DE COMPRAS----------------------------------

function addIngreso() {
  marca = document.getElementById("marca_ingreso").value;
  compra = document.getElementById("fecha_compra").value;
  vencimiento = document.getElementById("vencimiento").value;
  cantidad_ingreso = document.getElementById("cantidad_ingreso").value;
  descripcion_ingreso = document.getElementById("descripcion_ingreso").value;
  precio = document.getElementById("precio_ingreso").value;

  var fechaConFormato3 = moment(compra);
  var fechaConFormato4 = moment(vencimiento);
  fecha3 = fechaConFormato3.format("YYYY-MM-DD");
  fecha4 = fechaConFormato4.format("YYYY-MM-DD");
  if (marca.toString == 0 || descripcion_ingreso.toString == 0) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crearIngreso?tipo=${tipo_ingreso_ingreso}&marca=${marca}&fecha_compra=${fecha3}&vencimiento=${fecha4}&proveedor=${1}&precio=${precio}&cantidad=${cantidad_ingreso}&descripcion=${descripcion_ingreso}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  Ingresos(); //ACTUALIZA
  document.getElementById("formuingreso").style.display = "none"; //QUITA EL MODAL DE INSERTAR
}

// PARA RECARGAR LA PAGINA EN EL MOMENTO QUE SE CAIGA
let refresh = document.getElementById("cloud_load");
refresh.addEventListener("click", () => {
  location.reload();
});
///EVENTO PARA INGRESO DE INGRESOS DE COMPRAS
var tipo_ingreso_ingreso;
let optionIngreso = document.getElementById("select_tipo_ingreso");
optionIngreso.addEventListener("change", function () {
  tipo_ingreso_ingreso =
    optionIngreso.options[optionIngreso.selectedIndex].text;
});

function selectTipoIngreso() {
    fetch("http://localhost:3000/tiposIngreso", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => mostrarselectTipoIngreso(datos.results))
      .catch((err) => seeLoad());
  }
  
  const mostrarselectTipoIngreso = (data) => {
    let tab = "";
    tab += `<option disabled selected="">Tipo Ingreso</option>`;
    for (var i = 0; i < data.length; i++) {
      tab += `<option>${data[i].Ingreso}</option>`;
    }
    document.getElementById("select_tipo_ingreso").innerHTML = tab;
  };

//EN CASO DE CAIDA
function seeLoad() {
  cloud = document.getElementById("cloud_load");
  cloud.style.display = "flex";
}

/// BORRA DATOS DE INGRESO
function deleteIngreso(Id) {
  try {
    url = `http://localhost:3000/borrarIngreso?IdIngreso=${Id}`;
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
  Ingresos(); //ACTUALIZA
}
