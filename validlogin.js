document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Envía los datos del formulario al servidor utilizando AJAX o Fetch API
    fetch("procesar_login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuario, contraseña })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id_cargo === 1) {
            window.location.href = "ControlVentas.html"; // Redirige a la página del administrador
        } else if (data.id_cargo === 2) {
            window.location.href = "ModuloConcentrado.html"; // Redirige a la página del trabajador
        } else {
            document.getElementById("mensajeError").style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
















/*
$usuario=$_POST['usuario'];
$contraseña=$_POST['contraseña'];
session_start();
$_SESSION['usuario']=$usuario;

$conexion=msqli_connect("localhost","root","12345678","");

$consulta="SELECT*FROM tbusuarios where usuario='$usuario' and contraseña='$contraseña'";
$resultado=mysqli_query($conexion,$consulta);

$filas=mysqli_fetch_array($resultado);

if ($filas['id_cargo']==1) {//admin
    Headers("location:admin.php") //esta seria la pagina a la que ve el admin
} else if ($filas['id_cargo']==2) {
    Headers("location:trabajador.php") // lo que ve el trabajador
}else{
    ?>
    <?Php
    incluide("login.html");
    ?>
    <h1 class="bad">ERROR EN LA ATENTIFICACION</h1>
    <?php
}
mysqli_free_result($resultado);
mysqli_close($conexion);