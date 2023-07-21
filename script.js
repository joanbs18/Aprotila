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
var add_muestreo = document.getElementById("add_muestreo");
add_muestreo.addEventListener("click", function () {
  pilas();
  document.getElementById("fmuestreo").style.display = "flex";
});

var add_trazabilidad = document.getElementById("add_trazabilidad");
add_trazabilidad.addEventListener("click", function () {
  pilas();
  document.getElementById("ftrazabilidad").style.display = "flex";
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
var closeModal_muestreo = document.getElementById("closeModal_muestreo");
closeModal_muestreo.addEventListener("click", function () {
  document.getElementById("fmuestreo").style.display = "none";
});

var closeModal_trazabilidad = document.getElementById(
  "closeModal_trazabilidad"
);
closeModal_trazabilidad.addEventListener("click", function () {
  document.getElementById("ftrazabilidad").style.display = "none";
});
var closeModal = document.getElementById("closeModal_inveConcentrado");
closeModal.addEventListener("click", function () {
  document.getElementById("formuinveConcentrado").style.display = "none";
});

var closeModal_alimento = document.getElementById("closeModal_alimento");
closeModal_alimento.addEventListener("click", function () {
  document.getElementById("formualimentacion").style.display = "none";
});

var add_concetrado = document.getElementById("add_Concentrado");
add_concetrado.addEventListener("click", function () {
  document.getElementById("formuconcentrado").style.display = "flex";
});

var add_inveConcentrado = document.getElementById("add_inveConcentrado");
add_inveConcentrado.addEventListener("click", function () {
  document.getElementById("finveConcentrado").style.display = "flex";
});

var closeModal_mortabilidad = document.getElementById(
  "closeModal_mortabilidad"
);
closeModal_mortabilidad.addEventListener("click", function () {
  document.getElementById("formumortabilidad").style.display = "none";
});

var add_Alevines = document.getElementById("add_Alevines");
add_Alevines.addEventListener("click", function () {
  document.getElementById("formualevines").style.display = "flex";
});

var closeModal_alevines = document.getElementById("closeModal_alevines");
closeModal_alevines.addEventListener("click", function () {
  document.getElementById("formualevines").style.display = "none";
});

var closeModal_inveConcentrado = document.getElementById(
  "closeModal_inveConcentrado"
);
closeModal_inveConcentrado.addEventListener("click", function () {
  document.getElementById("finveConcentrado").style.display = "none";
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
  document.getElementById("menupila_alevines").innerHTML = tab;
  document.getElementById("menupila_trazabilidadInicial").innerHTML = tab;
  document.getElementById("menupila_trazabilidadFinal").innerHTML = tab;
  document.getElementById("menupila_muestreo").innerHTML = tab;
};

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
      <td class="last" data-label="Tipo Concentrado">${data[i].Tipo_Concentrado}</td>
      <td data-label="Pila">${data[i].Pila}</td>
      <td data-label="Cantidad Kilos">${data[i].Kilos}</td>
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
  totalDiario = document.getElementById("totalDiario").value;
  obtenerFecha();

  if (totalDiario.toString == 0) {
    alert("Error campos incompletos");
    return;
  }
  url = `http://localhost:3000/insertAlimentacion?Id=${1}&IdEncargado=${1}&Fecha=${obtenerFecha()}&Tipo=${tipo_ConcSeleccionado}&IdPila=${pilaSeleccionada2}&TotalDiario=${totalDiario}`;

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

function selectInveConcentrado() {
  fetch("http://localhost:3000/inveConcentrado", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarSelectInveConcentrado(datos.results))
    .catch((err) => seeLoad());
}

const mostrarSelectInveConcentrado = (data) => {
  let tab = "";
  tab += `<option disabled selected="">Tipo Concentrado</option>`;
  for (var i = 0; i < data.length; i++) {
    tab += `<option>${data[i].TipoConcentrado}</option>`;
  }
  document.getElementById("select_tipConcentrado").innerHTML = tab;
};

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

var pilaSeleccionada5;
var optionPila5 = document.getElementById("menupila_alevines");
optionPila5.addEventListener("change", function () {
  pilaSeleccionada5 = optionPila5.options[optionPila5.selectedIndex].text;
  validarPila = true;
});

var pilaSeleccionada6;
var optionPila6 = document.getElementById("menupila_trazabilidadInicial");
optionPila6.addEventListener("change", function () {
  pilaSeleccionada6 = optionPila6.options[optionPila6.selectedIndex].text;
});

var pilaSeleccionada7;
var optionPila7 = document.getElementById("menupila_trazabilidadFinal");
optionPila7.addEventListener("change", function () {
  pilaSeleccionada7 = optionPila7.options[optionPila7.selectedIndex].text;
});
var pilaSeleccionada8;
var optionPila8 = document.getElementById("menupila_muestreo");
optionPila8.addEventListener("change", function () {
  pilaSeleccionada8 = optionPila8.options[optionPila8.selectedIndex].text;
});

var aprobacionSeleccionado;
var optionAprobado = document.getElementById("aprobacion_muestreo");
optionAprobado.addEventListener("change", function () {
  aprobacionSeleccionado =
    optionAprobado.options[optionAprobado.selectedIndex].text;
});

//SELECT DE FORMA DE PAGO CON EVENTO DE CAMBIO

var validarMetodoPago = false;
var metodoSeleccionado;
var optionPago = document.getElementById("pago");
optionPago.addEventListener("change", function () {
  metodoSeleccionado = optionPago.options[optionPago.selectedIndex].text;

  validarMetodoPago = true;
});

var tipo_ConcSeleccionado;
var optionConcentrado1 = document.getElementById("select_tipConcentrado");
optionConcentrado1.addEventListener("change", function () {
  tipo_ConcSeleccionado =
    optionConcentrado1.options[optionConcentrado1.selectedIndex].text;
});

//---------------------------------------------------------------------------
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
      <td data-label="Cantidad Kilos">${data[i].Cantidad_Kilos}</td>
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
  sacos = document.getElementById("sacos").value;
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
  url = `http://localhost:3000/crearconcentrado?tipo=${tipo}&marca=${marca}&compra=${fecha3}&vencimiento=${fecha4}&proveedor=${1}&precio=${precio}&cantidadkilos=${sacos}&proteina=${proteina}`;

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

var IdAlevines;

function UpdateAlevine(VAlevines, pos) {
  Lote = document.getElementById("lote");
  Especie = document.getElementById("Especie");
  cantidad_alevine = document.getElementById("cantidad_alevine");
  provedorr = document.getElementById("Encargados_Alevines");
  idpla = document.getElementById("menupila_alevines");
  IdAlevines = VAlevines[pos].IdAlevines;
  Lote.value = VAlevines[pos].Lote_Provedor;
  Especie.value = VAlevines[pos].EspeciePescado;
  cantidad_alevine.value = VAlevines[pos].Cantidad;
  provedorr.value = VAlevines[pos].NombreProveedor;
  idpla.value = VAlevines[pos].Pila;
  document.getElementById("btnAlevineAdd").style.display = "none";
  document.getElementById("btnAlevineUpdate").style.display = "inline";
  document.getElementById("formualevines").style.display = "flex";
}

function UpdateAlevine2() {
  Lote = document.getElementById("lote").value;
  Especie = document.getElementById("Especie").value;
  Cantidad_alevine = document.getElementById("cantidad_alevine").value;

  url = `http://localhost:3000/updateAlevine?Id=${IdAlevines}&IdProvedor=${1}&Lote=${Lote}&IdEncargado=${1}&pila=${1}&Especie=${Especie}&Cantidad=${Cantidad_alevine}`;

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
  document.getElementById("formumortabilidad").style.display = "none";
}

function addAlevine() {
  Lote = document.getElementById("lote").value;
  Especie = document.getElementById("Especie").value;
  Cantidad_alevine = document.getElementById("cantidad_alevine").value;

  if (
    Lote.toString == 0 ||
    Especie.toString == 0 ||
    Cantidad_alevine.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertAlevines?IdProvedor=${1}&Lote=${Lote}&IdEncargado=${1}&IdPila=${pilaSeleccionada5}&Especie=${Especie}&Cantidad=${Cantidad_alevine}`;

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

function tableInveConcentrado() {
  fetch("http://localhost:3000/inveConcentrado", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarInveConcentrado(datos.results))
    .catch((err) => seeLoad());
}

const mostrarInveConcentrado = (data) => {
  let tab = "";
  let infor = "";
  for (var i = 0; i < data.length; i++) {
    var f = moment(data[i].Fecha);
    nueva = f.format("DD/MM/YYYY");
    tab += `<tr>
      <td data-label="Tipo Concentrado">${data[i].TipoConcentrado}</td>
      <td data-label="Kilos Disponibles">${data[i].Cantidad_Kilos}</td>
      <td data-label="Ultimo Ingreso">${nueva}</td>
  
  </td>

      </tr>`;
    if (data[i].Cantidad_Kilos <= 10) {
      infor += `<div class="toast info" id="3">
      <div class="contenido">
          <div class="icono">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path
                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
          </div>
          <div class="texto">
              <p class="titulo">Info</p>
              <p class="descripcion">${
                "Se esta agotando o está agotado el concentrado => " +
                data[i].TipoConcentrado
              }</p>
          </div>
      </div>
      <button class="btn-cerrar">
          <div class="icono">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
          </div>
      </button>
  </div>`;
      document.getElementById("contenedor-toast").innerHTML = infor;
      document.getElementById("contenedor-toast").style.display = "flex";
    }
  }
  document.getElementById("Rinveconcentrado").innerHTML = tab;
};

function addInveConcentrado() {
  tipo_Concentrado = document.getElementById("Tipo_Concentrado").value;
  Cantidad_Concentrado = document.getElementById("CantidadConcentrados").value;

  if (tipo_Concentrado.toString == 0 || Cantidad_Concentrado.toString == 0) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertInveConcentrado?Tipo=${tipo_Concentrado}&Cantidad=${Cantidad_Concentrado}`;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("formuinveConcentrado").style.display = "none";
  tableInveConcentrado();
}

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
      <td data-label="Pila Inicial">${data[i].IdPila_fk_Inicial}</td>
      <td data-label="Pila Final">${data[i].IdPila_fk_Final}</td>
      <td data-label="Peso">${data[i].Peso}</td>
      <td data-label="Fecha">${fechaT}</td>
      <td data-label="Cantidad">${data[i].Cantidad}</td>
      <td data-label="Aprobación">${Aprobacion}</td>
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
  lote_trazabilidad = document.getElementById("lote_trazabilidad").value;
  Peso_trazabilidad = document.getElementById("Peso_trazabilidad").value;
  Cantidad_trazabilidad = document.getElementById(
    "Cantidad_trazabilidad"
  ).value;

  if (
    lote_trazabilidad.toString == 0 ||
    Peso_trazabilidad.toString == 0 ||
    Cantidad_trazabilidad.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertTrazabilidad?Lote=${lote_trazabilidad}&IdPila_fk_Inicial=${pilaSeleccionada6}&IdPila_fk_Final=${pilaSeleccionada7}&Peso=${Peso_trazabilidad}&Cantidad=${Cantidad_trazabilidad}`;

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
  let aprobado;
  if (aprobacionSeleccionado == "Si") {
    aprobado = 1;
  } else {
    aprobado = 0;
  }

  if (cantidad_muestreo.toString == 0 || peso_muestreo.toString == 0) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertMuestreo?Pila=${pilaSeleccionada8}&Cantidad=${cantidad_muestreo}&Peso=${peso_muestreo}&Encargado=${1}&Aprobado=${aprobado}`;

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
}

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
}

function mostrarTras() {
  var Lote = prompt("Ingresa tu nombre:", "");
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
  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      tab += `<p>Pila Inicial: ${data[i].Inicial} => ${data[i].Final}`;
    } else {
      tab += `=> ${data[i].Final} </p>`;
    }
  }
  document.getElementById("modalTrazabilidad").innerHTML = tab;
};

function showDiv1() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "inline";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}
function showDiv2() {
  document.getElementById("divConcentrado").style.display = "inline";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  concentrados();
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}

function showDiv3() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "inline";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  alimentacion();
  selectInveConcentrado();
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}

function showDiv4() {
  tablePilas();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "inline";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}

function showDiv5() {
  tableMortabilidad();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "inline";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}

function showDiv6() {
  tableMortabilidad();
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "inline";
  document.getElementById("divinveConcentrado").style.display = "none";
  tableAlevines();
  pilas();
  document.getElementById("contenedor-toast").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
}

function showDiv7() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "inline";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "none";
  tableInveConcentrado();
}

function showDiv8() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "inline";
  document.getElementById("divMuestreo").style.display = "none";
  tableTrazabilidad();
}

function showDiv9() {
  document.getElementById("divConcentrado").style.display = "none";
  document.getElementById("divVentas").style.display = "none";
  document.getElementById("divAlimentacion").style.display = "none";
  document.getElementById("divPila").style.display = "none";
  document.getElementById("divMortabilidad").style.display = "none";
  document.getElementById("divAlevines").style.display = "none";
  document.getElementById("divinveConcentrado").style.display = "none";
  document.getElementById("divTrazabilidad").style.display = "none";
  document.getElementById("divMuestreo").style.display = "Inline";
  tableMuestreo();
}

const contenedorBotones = document.getElementById("contenedor-botones");
const contenedorToast = document.getElementById("contenedor-toast");

// Event listener para detectar click en los botones
contenedorBotones.addEventListener("click", (e) => {
  e.preventDefault();

  const tipo = e.target.dataset.tipo;

  if (tipo === "exito") {
    agregarToast({
      tipo: "exito",
      titulo: "Exito!",
      descripcion: "La operación fue exitosa.",
      autoCierre: true,
    });
  }
  if (tipo === "error") {
    agregarToast({
      tipo: "error",
      titulo: "Error",
      descripcion: "Hubo un error",
      autoCierre: true,
    });
  }
  if (tipo === "info") {
    agregarToast({
      tipo: "info",
      titulo: "Info",
      descripcion: "Esta es una notificación de información.",
    });
  }
  if (tipo === "warning") {
    agregarToast({
      tipo: "warning",
      titulo: "Warning",
      descripcion: "Ten cuidado",
    });
  }
});

// Event listener para detectar click en los toasts

// Función para cerrar el toast
const cerrarToast = (id) => {
  document.getElementById(id).classList.add("cerrando");
};

// Función para agregar la clase de cerrando al toast.
const agregarToast = ({ tipo, titulo, descripcion, autoCierre }) => {
  // Crear el nuevo toast
  const nuevoToast = document.createElement("div");

  // Agregar clases correspondientes
  nuevoToast.classList.add("toast");
  nuevoToast.classList.add(tipo);
  if (autoCierre) nuevoToast.classList.add("autoCierre");

  // Agregar id del toast
  const numeroAlAzar = Math.floor(Math.random() * 100);
  const fecha = Date.now();
  const toastId = fecha + numeroAlAzar;
  nuevoToast.id = toastId;

  // Iconos
  const iconos = {
    exito: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
					<path
						d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
					/>
				</svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
								/>
							</svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
								<path
									d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>`,
  };

  // Plantilla del toast
  const toast = `
		<div class="contenido">
			<div class="icono">
				${iconos[tipo]}
			</div>
			<div class="texto">
				<p class="titulo">${titulo}</p>
				<p class="descripcion">${descripcion}</p>
			</div>
		</div>
		<button class="btn-cerrar">
			<div class="icono">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
					<path
						d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</div>
		</button>
	`;

  // Agregar la plantilla al nuevo toast
  nuevoToast.innerHTML = toast;

  // Agregamos el nuevo toast al contenedor
  contenedorToast.appendChild(nuevoToast);

  // Función para menajera el cierre del toast
  const handleAnimacionCierre = (e) => {
    if (e.animationName === "cierre") {
      nuevoToast.removeEventListener("animationend", handleAnimacionCierre);
      nuevoToast.remove();
    }
  };

  if (autoCierre) {
    setTimeout(() => cerrarToast(toastId), 5000);
  }

  // Agregamos event listener para detectar cuando termine la animación
  nuevoToast.addEventListener("animationend", handleAnimacionCierre);
};
