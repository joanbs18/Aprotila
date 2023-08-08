
tablePilas();
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