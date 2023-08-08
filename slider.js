 ///ES PARA CERRAR Y ABRIR EL MENÚ DE LA IZQUIERDA
 let arrow = document.querySelectorAll(".arrow");
 for (var i = 0; i < arrow.length; i++) {
     arrow[i].addEventListener("click", (e) => {
         let arrowParent = e.target.parentElement.parentElement;
         arrowParent.classList.toggle("showMenu");
     });
 }


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