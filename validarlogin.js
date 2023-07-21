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