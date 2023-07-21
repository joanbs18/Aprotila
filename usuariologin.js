















const usuario = new Users({ name, identification, password, telephone, rol });

        //creamos las vueltas del  encriptado 
        const salt = bcrypt.genSaltSync();

        //Encriptamos el password
        usuario.password = bcrypt.hashSync(password, salt);