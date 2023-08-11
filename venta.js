ver();
mostrarPilaInactivas();
var encargado = JSON.parse(localStorage.getItem("user"));
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
    !validarPila ||
    peso.toString == 0 ||
    tilapia.toString == 0 ||
    precio.toString == 0 ||
    nomCliente.toString == 0 ||
    numero.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/crear?Encargado=${encargado.IdEncargado}&Fecha=${fecha}&Pila=${pilaSeleccionada}&Peso=${peso}&Tilapia=${tilapia}&Precio=${precio}&Total=${total}&Cliente=${nomCliente}&Telefono=${numero}&MétodoPago=${metodoSeleccionado}`;
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
  document.getElementById("formuventa").style.display = "none";
});

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
function mostrarFecha(fecha) {
  var fechaConFormato = moment(fecha);
  fechaArreglada = fechaConFormato.format("YYYY-MM-DD");
  return fechaArreglada;
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
  document.getElementById("menupila").innerHTML = tab;
};

const preciou = document.getElementById("precio");
preciou.addEventListener("change", function () {
  precioo = document.getElementById("precio").value;
  pesoo = document.getElementById("peso").value;
  document.getElementById("iva").value="13%";
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

var validarPila = false;
var pilaSeleccionada;
var optionPila = document.getElementById("menupila");
optionPila.addEventListener("change", function () {
  pilaSeleccionada = optionPila.options[optionPila.selectedIndex].text;
  validarPila = true;
});

var validarMetodoPago = false;
var metodoSeleccionado;
var optionPago = document.getElementById("pago");
optionPago.addEventListener("change", function () {
  metodoSeleccionado = optionPago.options[optionPago.selectedIndex].text;

  validarMetodoPago = true;
});
