selectTipoIngreso();
tableInventario();

function tableInventario() {
    fetch("http://localhost:3000/inventario", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => mostrarInve(datos.results))
      .catch((err) => seeLoad());
  }
  
  const mostrarInve = (data) => {
    let tab = "";
    let infor = "";
    for (var i = 0; i < data.length; i++) {
        infor= encontrarMedida(data[i].TipoIngreso)
      const f = moment(data[i].FechaCompra);
      nueva = f.format("DD/MM/YYYY");
      const fcompra = moment(data[i].FechaModificacion);
      nueva2 = fcompra.format("DD/MM/YYYY");
      tab += `<tr>
        <td data-label="Tipo Ingreso">${data[i].TipoIngreso}</td>
        <td data-label="Fecha compra">${nueva}</td>
        <td data-label="Fecha Modificación">${nueva2}</td>
        <td data-label="Cantidad">${data[i].CantidadDisponible} ${infor}</td>
        <td data-label="Entradas">${data[i].Entradas}</td>
        <td data-label="Salidas">${data[i].Salidas}</td>
        <td data-label="Precio Actual">${data[i].Precio_Actual}</td>
        <td data-label="Precio Anterior">${data[i].Precio_Anterior}</td>
        <td data-label="Precio Promedio">${data[i].Precio_Promedio}</td>
    
    </td>
  
        </tr>`;
      if (data[i].CantidadDisponible <= 10) {
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
                  "Se esta agotando o está agotado el => " +
                  data[i].TipoIngreso
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
       
        document.getElementById("contenedor-toast").style.display = "flex";
      }
    }
    document.getElementById("Rinventario").innerHTML = tab;
  };


  function selectTipoIngreso() {
    fetch("http://localhost:3000/tiposIngreso", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((datos) => ObtenerTiposIngreso(datos.results))
      .catch((err) => console.log("Error con el select"));
  }
 var Vtipo_Ingreso=[];
  const ObtenerTiposIngreso = (data) => {
    Vtipo_Ingreso=data;
  };


  function encontrarMedida(tipo){
    for (let i = 0; i < Vtipo_Ingreso.length; i++) {
      if(Vtipo_Ingreso[i].Nombre==tipo){
        return Vtipo_Ingreso[i].Unidad_Medida;
      }
    }
  }

  function seeLoad() {
    cloud = document.getElementById("cloud_load");
    cloud.style.display = "flex";
  }