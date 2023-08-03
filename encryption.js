const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'tu_host_de_mysql',
  user: 'tu_usuario_de_mysql',
  password: 'tu_contraseña_de_mysql',
  database: 'nombre_de_tu_base_de_datos',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos establecida.');
});

// Ruta para encriptar la contraseña y guardarla en la base de datos
app.post('/encriptar-contrasena', (req, res) => {
  const { nombre, cedula, contraseña, id_cargo } = req.body;

  // Encripta la contraseña utilizando bcrypt
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(contraseña, saltRounds);

  // Guarda los datos en la base de datos
  const sql = 'INSERT INTO tbusuarios (nombre, Cedula, Contraseña, Id_Cargo) VALUES (?, ?, ?, ?)';
  const values = [nombre, cedula, hashedPassword, id_cargo];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al guardar los datos en la base de datos:', err);
      res.status(500).json({ message: 'Error al guardar los datos en la base de datos.' });
    } else {
      console.log('Datos guardados en la base de datos con éxito.');
      res.status(200).json({ message: 'Datos guardados en la base de datos con éxito.' });
    }
  });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000.');
});
