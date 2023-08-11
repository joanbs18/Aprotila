tableProveedores();
function tableProveedores() {
  fetch("http://localhost:3000/proveedor", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => mostrarProveedor(datos.resultado))
    .catch((err) => console.log(err));
}
var VProveedor = [];
const mostrarProveedor = (data) => {
  let tab = "";
  VProveedor = data;
  for (var i = 0; i < data.length; i++) {
    tab += `<tr>
              <td data-label="Tipo">${data[i].TipoProveedor}</td>
              <td data-label="Nombre">${data[i].NombreProveedor}</td>
              <td data-label="Dirección">${data[i].Dirección}</td>
              <td data-label="Ubicacion">${
                data[i].Provincia} - ${data[i].Cantón} - ${data[i].Distrito}
              </td>
              <td data-label="Contacto">${data[i].NombreContacto}</td>
              <td data-label="Cedula">${data[i].Cedula}</td>
              <td data-label="Teléfono">${data[i].Telefono}</td>
              <td data-label="Correo">${data[i].Email}</td>
              <td data-label="Acción">
              <button class="btnUpdate" id="btnUpdate_Proveedor"><i class="fa-solid fa-pen-to-square"></i></button>   
              
          </td>
        
              </tr>`;
  }
  document.getElementById("RProveedor").innerHTML = tab;
  // eles = document.querySelectorAll("#btnTrash_Muestreo");
  // console.log(eles);
  // for (let i = 0; i < eles.length; i++) {
  //   eles[i].addEventListener("click", function () {
  //     deleteMuestreo(VMuestreo[i].IdMuestreo);
  //     tableMuestreo();
  //     mostrarPilaInactivas();
  //   });
  // }
  eles2 = document.querySelectorAll("#btnUpdate_Proveedor");
  console.log(eles2);
  for (let i = 0; i < eles2.length; i++) {
    eles2[i].addEventListener("click", function () {
      UpdateProveedor(VProveedor, i);
    });
  }
};

function addProveedor() {
  Nombre_proveedor = document.getElementById("Nombre_proveedor").value;
  Dirección = document.getElementById("Dirección").value;
  nombreContacto = document.getElementById("nombreContacto").value;
  cedula_contacto = document.getElementById("cedula_contacto").value;
  Telefono = document.getElementById("Telefono").value;
  Email_proveedor = document.getElementById("Email_proveedor").value;

  if (
    Nombre_proveedor.toString == 0 ||
    Dirección.toString == 0 ||
    nombreContacto.toString == 0 ||
    cedula_contacto.toString == 0 ||
    Telefono.toString==0 ||
    Email_proveedor.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/insertProveedor?Tipo=${TipoSeleccionado}&Nombre=${Nombre_proveedor}&Direccion=${Dirección}&NContacto=${nombreContacto}&Cedula=${cedula_contacto}&Telefono=${Telefono}&Email=${Email_proveedor} `;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("formuproveedor").style.display = "none";
  tableProveedores();
}

var TipoSeleccionado;
var Proveedor_Tipo = document.getElementById("Proveedor_Tipo");
Proveedor_Tipo.addEventListener("change", function () {
    TipoSeleccionado =
    Proveedor_Tipo.options[Proveedor_Tipo.selectedIndex].text;
});



function UpdateProveedor(proveedor,i) {
  document.getElementById('formuproveedorUpdate').style.display="flex";
  document.getElementById("Nombre_proveedorU").value=proveedor[i].NombreProveedor
  document.getElementById("DirecciónU").value=proveedor[i].Dirección
  document.getElementById("nombreContactoU").value=proveedor[i].NombreContacto
  document.getElementById("cedula_contactoU").value=proveedor[i].Cedula;
  document.getElementById("TelefonoU").value=proveedor[i].Telefono;
  document.getElementById("Email_proveedorU").value=proveedor[i].Email;

}
function UpdateProveedor2() {
  
  Nombre_proveedorU = document.getElementById("Nombre_proveedorU").value;
  DirecciónU = document.getElementById("DirecciónU").value;
  nombreContactoU = document.getElementById("nombreContactoU").value;
  cedula_contactoU = document.getElementById("cedula_contactoU").value;
  TelefonoU= document.getElementById("TelefonoU").value;
  Email_proveedorU = document.getElementById("Email_proveedorU").value;

  if (
    Nombre_proveedorU.toString == 0 ||
    DirecciónU.toString == 0 ||
    nombreContactoU.toString == 0 ||
    cedula_contactoU.toString == 0 ||
    TelefonoU.toString==0 ||
    Email_proveedorU.toString == 0
  ) {
    alert("Error campos incompletos");
  }
  url = `http://localhost:3000/updateProveedor?Nombre=${Nombre_proveedorU}&Direccion=${DirecciónU}&NContacto=${nombreContactoU}&Cedula=${cedula_contactoU}&Telefono=${TelefonoU}&Email=${Email_proveedorU}&Provincia=${provinciaSeleccionadaU}&Distrito=${distritoSeleccionadoU}&Canton=${cantonSeleccionadoU} `;

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((datos) => console.log(datos))
    .catch((err) => console.log(err));
  document.getElementById("formuproveedorUpdate").style.display = "none";
  tableProveedores();
}
