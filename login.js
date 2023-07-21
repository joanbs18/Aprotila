
var usuario = document.getElementById('usuario').value;
var contraseña = document.getElementById('contraseña').value;

// Se realizará una llamada a una base de datos utilizando Ajax o fetch para obtener los datos del servidor.

// Supongamos que ya hemos obtenido los datos del servidor en la variable "datosUsuarios" en formato JSON.
// Es importante tener en cuenta que en JavaScript, los datos de contraseña generalmente deben estar encriptados en la base de datos.
// Por razones de seguridad, NO deberías almacenar contraseñas en texto claro en la base de datos.

// Comprobamos si el usuario y la contraseña coinciden en los datos obtenidos del servidor.
var usuarioEncontrado = datosUsuarios.find(function(usuarioActual) {
  return usuarioActual.usuario === usuario && usuarioActual.contraseña === contraseña;
});

if (usuarioEncontrado) {
  // Si el usuario y la contraseña coinciden, creamos una sesión en el lado del cliente.
  // Nota: Esta es una implementación muy básica de manejo de sesiones, para un escenario real, es preferible usar técnicas más seguras.
  sessionStorage.setItem('trabajador', usuario);

  // Luego, redirigimos al usuario a una página de inicio de sesión exitoso.
  window.location.href = "../usuariologin.js";
} else {
  // Si no se encuentra el usuario en la base de datos o las credenciales no coinciden, mostramos un mensaje de alerta.
  alert("No se encuentra su usuario o las credenciales son incorrectas.");

  // Después del mensaje de alerta, redirigimos al usuario a la página de inicio de sesión nuevamente.
  window.location.href = "./index.html";
}












/*
$usuario=$_POST['usuario'];
$contraseña=$_POST['contraseña'];

$_verificacion = mysqli_query($conexion, "SELECT * FROM usuarios WHERE
    usuario ='$usuario' and
    contraseña ="$contraseña' ");  

$filas=mysqli_num_rows($verificacion);

if ($fila>0) {
    session_Start();
    $session['trabajador']= $usuario;

    header("location:../usuariologin.js");
} else {
    alert("no se encuentra su usuario")
    location.href= "./index.html";
    
}



/*
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












//encription

fetch("procesar_login.html", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, hashedPassword })
  })
  .then(response => response.json())
  .then(data => {
    // Tu código de manejo de respuesta del servidor aquí
    // ...
  })
  .catch(error => {
    console.error("Error:", error);


// opcion1

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

//opcion 2

app.get('/login', (req, res) => {
    const { username, password } = req.query;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Se requiere un nombre de usuario y una contraseña' });
    }
  
    db.query(
      'SELECT * FROM usuario WHERE nombre_usuario = ? AND contrasena = ?',
      [username, password],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error en el servidor' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
  
        // El usuario ha sido autenticado correctamente
        return res.json({ message: 'Login exitoso', user: results[0] });
      }
    );
});
