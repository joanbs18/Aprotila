const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// Configurar el servidor para recibir JSON en las solicitudes
app.use(express.json());

// Ruta para encriptar la contraseña
app.post('/encriptar-contrasena', (req, res) => {
  const { password } = req.body;

  // Verificar que se haya proporcionado una contraseña
  if (!password) {
    return res.status(400).json({ error: 'Debes proporcionar una contraseña' });
  }

  // Generar el hash de la contraseña
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  return res.json({ hashedPassword });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
