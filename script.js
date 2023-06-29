///ES PARA CERRAR Y ABRIR EL MENÚ DE LA IZQUIERDA
let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
}
/*
let link_name = document.querySelectorAll(".link_name");
for (var i = 0; i < link_name.length; i++) {
  console.log(link_name[i].innerHTML);
  if(link_name[i].innerHTML=="Modulo Ventas"){
    link_name[i].classList.toggle("this");
  }
}
*/
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.getElementById("menu");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  var item = document.getElementById("sidebar");
  var hasClase2 = item.classList.contains("close");
});
let nav_links = document.getElementById("nav-links");
sidebar.addEventListener("click", function (event) {
  if (event.target == nav_links) {
    sidebar.classList.toggle("close");
  }
});

let main = document.getElementById("main");
main.addEventListener("click", function (event) {
  if (!sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
  }
});
//------------------------------------------------------------
var fecha;
//PARA AÑADIR UNA VENTA---------------------------------------
function obtenerFecha() {
  var fecha_hoy = new Date();
  var mes = (fecha_hoy.getMonth() + 1).toString();
  if (mes.length <= 1) {
    mes = "0" + mes;
  }

  var dia = fecha_hoy.getDate().toString();
  if (dia.length <= 1) {
    dia = "0" + dia;
  }
  fecha_actual = fecha_hoy.getFullYear() + "-" + mes + "-" + dia;
  var fechaConFormato = moment(fecha_actual);
  fecha = fechaConFormato.format("YYYY-MM-DD");
  return fecha;
}
ver();
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
  let tab = "";
  ventasDelete = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormato = moment(data[i].Fecha);
    console.log(data[i].Fecha);
    fecha = fechaConFormato.format("YYYY-MM-DD");
    tab += `<tr>
      <td data-label="Encargado">${data[i].Encargado}</td>
      <td class="last" data-label="Fecha">${fecha}</td>
      <td data-label="Pila">${data[i].Pila}</td>
      <td data-label="Peso">${data[i].Peso}</td>
      <td data-label="Tilapia">${data[i].Tilapia}</td>
      <td data-label="Total">${data[i].Total}</td>
      <td data-label="Cliente">${data[i].Cliente}</td>
      <td data-label="Teléfono">${data[i].Telefono}</td>
      <td class="last" data-label="Tipo de Pago">${data[i].MétodoPago}</td>
      <td>
      <button class="btnUpdate" id="btnUpdate"><i class="fa-solid fa-pen-to-square"></i></button>   
      <button class="btnTrash" id="btnTrash_ventas" ><i class="fa-solid fa-trash-can"></i></button>
  </td>
  </tr>`;
  }
  document.getElementById("registers").innerHTML = tab;

  eles = document.querySelectorAll("#btnTrash_ventas");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      console.log(ventasDelete[i]);
      deleteVenta(ventasDelete[i].IdVenta);
    });
  }
};

//--------------------------------------------------------------

//EVENTO PARA ABRIR EL MODAL
var addIcon = document.getElementById("add");
addIcon.addEventListener("click", function () {
  pilas();
  document.getElementById("formu-modal").style.display = "flex";
});

var add_alimento = document.getElementById("add_alimento");
add_alimento.addEventListener("click", function () {
  pilas();
  document.getElementById("formualimentacion").style.display = "flex";
});

var add_Mortabilidad = document.getElementById("add_Mortabilidad");
add_Mortabilidad.addEventListener("click", function () {
  pilas();
  document.getElementById("formumortabilidad").style.display = "flex";
});

//EVENTO PARA CERRAR EL MODAL

var closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", function () {
  document.getElementById("formu-modal").style.display = "none";
});

var closeModal_alimento = document.getElementById("closeModal_alimento");
closeModal_alimento.addEventListener("click", function () {
  document.getElementById("formualimentacion").style.display = "none";
});

var add_concetrado = document.getElementById("add_Concentrado");
add_concetrado.addEventListener("click", function () {
  document.getElementById("formuconcentrado").style.display = "flex";
});

var closeModal_mortabilidad = document.getElementById(
  "closeModal_mortabilidad"
);
closeModal_mortabilidad.addEventListener("click", function () {
  document.getElementById("formumortabilidad").style.display = "none";
});

//EVENTO DE BORRAR VENTA------------------------------

function deleteVenta(idVenta) {
  try {
    fetch(`http://localhost:3000/borrarventa?IdVenta=${idVenta}`, {
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
  ver();
}

function pilas() {
  fetch("http://localhost:3000/pilas", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarPilas(datos.results))
    .catch((err) => console.log());
}

const mostrarPilas = (data) => {
  let tab = "";
  tab += `<option disabled selected="">Número Pila</option>`;
  for (var i = 0; i < data.length; i++) {
    tab += `<option>${data[i].IdPila}</option>`;
  }
  document.getElementById("menupila").innerHTML = tab;
  document.getElementById("menupila_alimentacion").innerHTML = tab;
  document.getElementById("menupila_mortabilidad").innerHTML = tab;
};

alimentacion();

function alimentacion() {
  fetch("http://localhost:3000/alimentacion", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarAlimetacion(datos.results))
    .catch((err) => console.log());
}
var Valimentacion = [];
const mostrarAlimetacion = (data) => {
  let tab = "";
  Valimentacion = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormato = moment(data[i].Fecha);
    fechaa = fechaConFormato.format("YYYY-MM-DD");
    tab += `<tr>
      <td data-label="Encargado">${data[i].Encargado}</td>
      <td class="last" data-label="Fecha">${fechaa}</td>
      <td data-label="Pila">${data[i].Pila}</td>
      <td data-label="Total Semanal">${data[i].Total}</td>
      <td>
      <button class="btnUpdate" id="btnUpdate_Alimentacion"><i class="fa-solid fa-pen-to-square"></i></button>   
      <button class="btnTrash" id="btnTrash_Alimentacion" ><i class="fa-solid fa-trash-can"></i></button>
  </td>
  </tr>`;
  }
  document.getElementById("RAlimentacion").innerHTML = tab;

  eles = document.querySelectorAll("#btnTrash_Alimentacion");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteAlimentacion(Valimentacion[i].idAlimentacion);
    });
  }
};

function addAlimentacion() {
  totalSemanal = document.getElementById("totalSemanal").value;
  obtenerFecha();

  if (total.toString == 0) {
    alert("Error campos incompletos");
    return;
  }
  url = `http://localhost:3000/insertAlimentacion?Id=${1}&IdEncargado=${1}&Fecha=${obtenerFecha()}&IdPila=${pilaSeleccionada2}&TotalSemanal=${totalSemanal}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("formualimentacion").style.display = "none";
  alimentacion();
}

function deleteAlimentacion(id) {
  try {
    fetch(`http://localhost:3000/deleteAlimentacion?id=${id}`, {
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
  alimentacion();
}

const preciou = document.getElementById("precio");
preciou.addEventListener("change", function () {
  precioo = document.getElementById("precio").value;
  pesoo = document.getElementById("peso").value;
  CalculoTotal = pesoo * precioo;
  total.value = CalculoTotal;
});

const pesou = document.getElementById("peso");
pesou.addEventListener("change", function () {
  precioo = document.getElementById("precio").value;
  pesoo = document.getElementById("peso").value;
  CalculoTotal = pesoo * precioo;
  total.value = CalculoTotal;
});

//FUNCIÓN PARA VALIDAR DATOS AL AGREGAR

var btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", function () {
  peso = document.getElementById("peso").value;
  tilapia = document.getElementById("tilapia").value;
  precio = document.getElementById("precio").value;
  total = document.getElementById("total").value;
  nomCliente = document.getElementById("nomCliente").value;
  numero = document.getElementById("numero").value;
  obtenerFecha();

  if (
    !validarEncargado ||
    !validarPila ||
    peso.toString == 0 ||
    tilapia.toString == 0 ||
    precio.toString == 0 ||
    nomCliente.toString == 0 ||
    numero.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crear?Encargado=${1}&Fecha=${fecha}&Pila=${pilaSeleccionada}&Peso=${peso}&Tilapia=${tilapia}&Precio=${precio}&Total=${total}&Cliente=${nomCliente}&Telefono=${numero}&MétodoPago=${metodoSeleccionado}`;
  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  ver();
});

function addVenta(url) {}

//SELECT DE ENCARGADO CON EVENTOS DE CAMBIO
var validarEncargado = false;
var encargadoSeleccionado;
var encargado = document.getElementById("encargado");
encargado.addEventListener("change", function () {
  encargadoSeleccionado = encargado.options[encargado.selectedIndex].text;

  validarEncargado = true;
});

//SELECT DE PILA CON EVENTOS DE CAMBIO
var validarPila = false;
var pilaSeleccionada;
var optionPila = document.getElementById("menupila");
optionPila.addEventListener("change", function () {
  pilaSeleccionada = optionPila.options[optionPila.selectedIndex].text;
  validarPila = true;
});
var pilaSeleccionada2;
var optionPila2 = document.getElementById("menupila_alimentacion");
optionPila2.addEventListener("change", function () {
  pilaSeleccionada2 = optionPila2.options[optionPila2.selectedIndex].text;
  validarPila = true;
});

var pilaSeleccionada3;
var optionPila3 = document.getElementById("menupila_mortabilidad");
optionPila3.addEventListener("change", function () {
  pilaSeleccionada3 = optionPila3.options[optionPila3.selectedIndex].text;
  validarPila = true;
});

//SELECT DE FORMA DE PAGO CON EVENTO DE CAMBIO

var validarMetodoPago = false;
var metodoSeleccionado;
var optionPago = document.getElementById("pago");
optionPago.addEventListener("change", function () {
  metodoSeleccionado = optionPago.options[optionPago.selectedIndex].text;

  validarMetodoPago = true;
});

//---------------------------------------------------------------------------
concentrados();
function concentrados() {
  fetch("http://localhost:3000/concentrados", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarData2(datos.results))
    .catch((err) => seeLoad());
}
var Vconcentrado = [];
const mostrarData2 = (data) => {
  let tab = "";
  Vconcentrado = data;
  for (var i = 0; i < data.length; i++) {
    var fechaConFormato1 = moment(data[i].Fecha_Compra);
    var fechaConFormato2 = moment(data[i].Fecha_Vencimiento);
    fecha1 = fechaConFormato1.format("YYYY-MM-DD");
    fecha2 = fechaConFormato2.format("YYYY-MM-DD");
    tab += `<tr>
      <td data-label="Tipo">${data[i].Tipo}</td>
      <td class="last" data-label="Marca">${data[i].Marca}</td>
      <td data-label="Compra">${fecha1}</td>
      <td data-label="Vencimiento">${fecha2}</td>
      <td data-label="Proveedor">${data[i].Proveedor}</td>
      <td data-label="Precio">${data[i].Precio}</td>
      <td data-label="Proteína">${data[i].Proteina}</td>
      <td>
      <button class="btnUpdate" id="btnUpdate_Concentrado"><i class="fa-solid fa-pen-to-square"></i></button>   
      <button class="btnTrash" id="btnTrash_Concentrado" ><i class="fa-solid fa-trash-can"></i></button>
      </td>
      </tr>`;
  }
  document.getElementById("Rconcentrado").innerHTML = tab;
  eles = document.querySelectorAll("#btnTrash_Concentrado");
  console.log(eles);
  for (let i = 0; i < eles.length; i++) {
    eles[i].addEventListener("click", function () {
      deleteConcentrado(Vconcentrado[i].IdConcentrado);
    });
  }
};

function addConcentrado() {
  tipo = document.getElementById("tipo").value;
  marca = document.getElementById("marca").value;
  compra = document.getElementById("compra").value;
  vencimiento = document.getElementById("vencimiento").value;
  proveedor = document.getElementById("proveedor").value;
  proteina = document.getElementById("proteina").value;
  precio = document.getElementById("Cprecio").value;
  var fechaConFormato3 = moment(compra);
  var fechaConFormato4 = moment(vencimiento);
  fecha3 = fechaConFormato3.format("YYYY-MM-DD");
  fecha4 = fechaConFormato4.format("YYYY-MM-DD");
  if (
    tipo.toString == 0 ||
    marca.toString == 0 ||
    proteina.toString == 0 ||
    proveedor.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crearconcentrado?tipo=${tipo}&marca=${marca}&compra=${fecha3}&vencimiento=${fecha4}&proveedor=${1}&precio=${precio}&proteina=${proteina}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  concentrados();
  document.getElementById("formuconcentrado").style.display = "none";
}

let refresh = document.getElementById("cloud_load");
refresh.addEventListener("click", (_) => {
  location.reload();
});

function deleteConcentrado(IdConcentrado) {
  try {
    url = `http://localhost:3000/borrarconcentrado?IdConcentrado=${IdConcentrado}`;
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
  concentrados();
}

function updateConcentrado() {
  try {
    const IdConcentrado = prompt(
      "Digite el IDConcentrado que desea borrar",
      "000"
    );

    fetch(`http://localhost:3000/concentrados`, {
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
}

/*MUESTRA LAS PILAS EN UNA TABLA EN MODULO CORRESPODIENTE*/
function tablePilas() {
  fetch("http://localhost:3000/pilas", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarPilas2(datos.results))
    .catch((err) => seeLoad());
}
const mostrarPilas2 = (data) => {
  let tab = "";
  for (var i = 0; i < data.length; i++) {
    tab += `<tr>
      <td data-label="Id Pila">${data[i].IdPila}</td>
      <td data-label="Marca">${data[i].Nombre}</td>
      
      </tr>`;
  }
  document.getElementById("RPila").innerHTML = tab;
};

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
  cantidad = document.getElementById("cantidad").value;
  Observaciones = document.getElementById("observaciones_mortabilidad").value;

  if (cantidad.toString == 0 || Observaciones.toString == 0) {
    alert("Error campos incompletos");
    return;
  }
  url = `http://localhost:3000/insertMortabilidad?Id=${"null"}&IdPila=${pilaSeleccionada3}&Cantidad=${cantidad}&IdEncargado=${1}&Observaciones=${Observaciones}`;

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

//_______________________________________________________________________________________

//EVENTO PARA ABRIR EL MODAL
function fconcentrado() {
  document.getElementById("formuconcentrado").style.display = "flex";
}

function falevines() {
  document.getElementById("formualevines").style.display = "flex";
}

//EVENTO PARA CERRAR EL MODAL

function close_fconcentrado() {
  document.getElementById("formuconcentrado").style.display = "none";
}

function tableAlevines() {
  fetch("http://localhost:3000/alevines", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarAlevines(datos.results))
    .catch((err) => seeLoad());
}
var VAlevines = [];
const mostrarAlevines = (data) => {
  let tab = "";
  VAlevines = data;
  for (var i = 0; i < data.length; i++) {
    tab += `<tr>
      <td data-label="Proveedor">${data[i].NombreProveedor}</td>
      <td data-label="Lote">${data[i].Lote_Provedor}</td>
      <td data-label="Encargado">${data[i].Nombre_Encargado}</td>
      <td data-label="Pila">${data[i].Pila}</td>
      <td data-label="Especie">${data[i].EspeciePescado}</td>
      <td data-label="Cantidad">${data[i].Cantidad}</td>
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
    });
  }
};

function addAlevine() {
  tipo = document.getElementById("tipo").value;
  marca = document.getElementById("marca").value;
  compra = document.getElementById("compra").value;
  vencimiento = document.getElementById("vencimiento").value;
  proveedor = document.getElementById("proveedor").value;

  if (
    tipo.toString == 0 ||
    marca.toString == 0 ||
    proteina.toString == 0 ||
    proveedor.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crearconcentrado?tipo=${tipo}&marca=${marca}&compra=${fecha3}&vencimiento=${fecha4}&proveedor=${proveedor}&precio=${precio}&proteina=${proteina}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  concentrados();
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
  tableMortabilidad();
}

function showDiv1() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "inline";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
}
function showDiv2() {
  document.getElementById("divConcentrado").style.display = "inline";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
}

function showDiv3() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "inline";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
}

function showDiv4() {
  tablePilas();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "inline";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
}

function showDiv5() {
  tableMortabilidad();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "inline";
  document.getElementById("divAlevines").style.display = "none";
}

function showDiv6() {
  tableMortabilidad();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "inline";
  tableAlevines();
}
