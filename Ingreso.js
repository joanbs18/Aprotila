 //LLAMADA INICIAL
selectTipoIngreso();
Ingresos();
selectProveedor()



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
  let tipo="";
  Vingreso = data;
  for (var i = 0; i < data.length; i++) {
    tipo=encontrarMedida(data[i].Tipo);
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
        <td data-label="Cantidad">${data[i].Cantidad} ${tipo}</td>
        <td data-label="Descripción">${data[i].Descripcion}</td>
        <td data-label="Acción">
        <button class="btnUpdate" id="btnUpdate_ingreso"><i class="fa-solid fa-pen-to-square"></i></button>   
        <button class="btnTrash" id="btnTrash_ingreso" ><i class="fa-solid fa-trash-can"></i></button>
        </td>
        </tr>`;
  }
  document.getElementById("RingresoS").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_ingreso");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteIngreso(Vingreso[i].IdIngreso);
    });
  }
};
 function encontrarMedida(tipo){
  for (let i = 0; i < Vtipo_Ingreso.length; i++) {
    if(Vtipo_Ingreso[i].Nombre==tipo){
      return Vtipo_Ingreso[i].Unidad_Medida;
    }
  }
}

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
  url = `http://localhost:3000/crearIngreso?tipo=${tipo_ingreso_ingreso}&Idencargado=1&marca=${marca}&fecha_compra=${fecha3}&vencimiento=${fecha4}&Idproveedor=${idProveedor}&precio=${precio}&cantidad=${cantidad_ingreso}&descripcion=${descripcion_ingreso}`;

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
  tipo_ingreso_ingreso =optionIngreso.options[optionIngreso.selectedIndex].text;
  let unidad="";
  unidad=encontrarMedida(tipo_ingreso_ingreso);
  document.getElementById('cantidad_medida').innerText=`Cantidad en ${unidad}`;
});


var proveedor_select;
let select_proveedor_ingreso = document.getElementById("select_proveedor_ingreso");
select_proveedor_ingreso.addEventListener("change", function () {
  proveedor_select =select_proveedor_ingreso.options[select_proveedor_ingreso.selectedIndex].text;
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





var tipo_unidad;
var validarUnidad=false;
let select_unidad_medida = document.getElementById("select_unidad_medida");
select_unidad_medida.addEventListener("change", function () {
  tipo_unidad =
  select_unidad_medida.options[select_unidad_medida.selectedIndex].text;
  validarUnidad=true;
});

function addTipoIngreso() {
  tipo = document.getElementById("tipo_ingreso_nombre").value;


  if (tipo.toString == 0 ||!validarUnidad) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crearTipoIngreso?Nombre=${tipo}&Unidad=${tipo_unidad}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
   //ACTUALIZA
   selectTipoIngreso();
  document.getElementById("formuingreso_tipo").style.display = "none"; //QUITA EL MODAL DE INSERTAR
  document.getElementById("formuingreso").style.display = "flex";
}

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
 var Vtipo_Ingreso=[];
  const mostrarselectTipoIngreso = (data) => {
    Vtipo_Ingreso=data;
    let tab = "";
    tab += `<option disabled selected="">Tipo Ingreso</option>`;
    for (var i = 0; i < data.length; i++) {
      tab += `<option>${data[i].Nombre}</option>`;
    }
    document.getElementById("select_tipo_ingreso").innerHTML = tab;
  };

  function selectProveedor() {
    fetch("http://localhost:3000/nombreProveedores", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => mostrarselectProveedor(datos.results))
      .catch((err) => seeLoad());
  }
  var SelectProveedor=[]
  const mostrarselectProveedor = (data) => {
    SelectProveedor=data;
    let tab = "";
    tab += `<option disabled selected="">Nombre Proveedor</option>`;
    for (var i = 0; i < data.length; i++) {
      tab += `<option>${data[i].NombreProveedor} - ${data[i].TipoProveedor}</option>`;
    }
    document.getElementById("select_proveedor_ingreso").innerHTML = tab;
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
