const mysql = require("mysql");
const express = require("express");
const port = 3000;
const app = express();
var cors = require("cors");

app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aprotilabd",
});

connection.connect(function (error) {
  if (error) {
    console.log("Error de conexion ", error.stack);
    return;
  }
  console.log("Conectado", connection.threadId);
});

app.get("/", (req, res) => {
  res.send("Corriendo en el puerto " + port);
});

app.get("/controlventa", (req, res) => {
  try {
    let sql =
      "SELECT IdVenta,tbE.Nombre_Encargado as 'Encargado', Fecha,IdPila_fk as 'Pila',Peso,Tilapia,Precio,Total,Cliente,Telefono,MétodoPago FROM controlventa as tbC INNER JOIN tbencargado as tbE WHERE tbC.IdEncargado_fk=tbE.IdEncargado";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/crear", (req, res) => {
  campos = [];
  campos.push(req.query.IdVenta);
  campos.push(req.query.Encargado);
  campos.push(req.query.Fecha);
  campos.push(req.query.Pila);
  campos.push(req.query.Peso);
  campos.push(req.query.Tilapia);
  campos.push(req.query.Precio);
  campos.push(req.query.Total);
  campos.push(req.query.Cliente);
  campos.push(req.query.Telefono);
  campos.push(req.query.MétodoPago);
  const insertar = `CALL insertVenta (${campos[1]}, '${campos[2]}', ${campos[3]}, ${campos[4]}, ${campos[5]}, ${campos[6]}, ${campos[7]}, '${campos[8]}', '${campos[9]}', '${campos[10]}')`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/borrarventa", (req, res) => {
  let sql = `DELETE FROM controlventa WHERE IdVenta = ${req.query.IdVenta}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.listen(port, () => {
  console.log("Funciona");
});

// TABLA INGRESOS------------------------------------------------

app.get("/ingresos", (req, res) => {
  try {
    let sql =
      "SELECT tbC.IdIngreso,tbTi.Nombre as 'Tipo',Marca,Fecha_Compra,Fecha_Vencimiento,tbP.NombreProveedor as 'Proveedor', Precio,Cantidad,Descripcion FROM `tbIngreso` as tbC INNER JOIN tbproveedores as tbP on tbC.IdProveedor_fk=tbP.IdProveedores INNER JOIN tbtipoingreso as tbTi on tbC.IdTipo_fk= tbTi.IdTipo";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/crearIngreso", (req, res) => {
  try {
    campos = [];
    campos.push(req.query.fecha_compra);
    campos.push(req.query.vencimiento);
    campos.push(req.query.Idencargado);
    campos.push(req.query.tipo);
    campos.push(req.query.Idproveedor);
    campos.push(req.query.marca);
    campos.push(req.query.cantidad);
    campos.push(req.query.precio);
    campos.push(req.query.descripcion);

    const insertar = `CALL insertIngreso ('${campos[0]}', '${campos[1]}', ${campos[2]}, '${campos[3]}', ${campos[4]}, '${campos[5]}', ${campos[6]},${campos[7]},'${campos[8]}')`;

    connection.query(insertar, (err, fields) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/borrarIngreso", (req, res) => {
  let sql = `DELETE FROM tbingreso WHERE IdIngreso = ${req.query.IdIngreso}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/pilas", (req, res) => {
  try {
    let sql = "SELECT IdPila,Nombre FROM tbpila";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/pilasActivas", (req, res) => {
  try {
    let sql = "SELECT IdPila FROM tbpila where Activo=0";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/pilasInactivas", (req, res) => {
  try {
    let sql = "SELECT IdPila FROM tbpila where Activo=1";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/tiposIngreso", (req, res) => {
  try {
    let sql = "SELECT Nombre,Unidad_Medida FROM tbtipoingreso";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/crearTipoIngreso", (req, res) => {
  try {
    campos = [];
    campos.push(req.query.Nombre);
    campos.push(req.query.Unidad);
    const insertar = `Insert Into tbtipoingreso (Nombre,Unidad_Medida) VALUES ('${campos[0]}','${campos[1]}')`;

    connection.query(insertar, (err, fields) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/nombreProveedores", (req, res) => {
  try {
    let sql = "SELECT NombreProveedor,TipoProveedor FROM tbproveedores";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/IdProveedor", (req, res) => {
  campos = [];
  campos.push(req.query.Nombre);
  campos.push(req.query.Tipo);
  try {
    let sql = `SELECT IdProveedores FROM tbproveedores as tb WHERE tb.NombreProveedor='${campos[0]}' AND tb.TipoProveedor='${campos[1]}'`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/gastos", (req, res) => {
  try {
    let sql =
      "SELECT tbA.IdGasto,tbE.Nombre_Encargado as 'Encargado', tbA.Fecha,tbTipo.Nombre as 'Ingreso', tbA.IdPila_fk as 'Pila',tbA.Total_Kilos as 'Kilos' FROM tbgasto as tbA INNER JOIN tbencargado as tbE ON tbA.IdEncargado_fk=tbE.IdEncargado INNER JOIN tbtipoingreso as tbTipo on tbA.IdTipoIngreso_fk=tbTipo.IdTipo";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertGasto", (req, res) => {
  campos = [];
  campos.push(req.query.IdGasto);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.Tipo);
  campos.push(req.query.IdPila);
  campos.push(req.query.Total);

  const insertar = `CALL insertGasto (${campos[1]}, '${campos[2]}', ${campos[3]}, ${campos[4]})`;

  connection.query(insertar, (err, results, fields) => {
    console.log(results[0])
    if (err) throw err;
  });
  
});

app.get("/deleteGasto", (req, res) => {
  let sql = `DELETE FROM tbgasto WHERE IdGasto = ${req.query.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/mortabilidad", (req, res) => {
  try {
    let sql =
      "SELECT IdMortabilidad,IdTrazabilidad_fk, IdPila_fk as 'IdPila', Cantidad, tbE.Nombre_Encargado,Fecha, Observaciones FROM `tbmortabilidad` INNER JOIN tbencargado as tbE WHERE tbmortabilidad.IdEncargado_fk=tbE.IdEncargado";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/ultimoTrazabi", (req, res) => {
  try {
    let sql = `SELECT tbT.IdTrazabilidad, tbT.Fecha,tbT.IdPila_fk_Final,tbP.CantidadPescados as "Cantidad" FROM tbtrazabilidad as tbT INNER JOIN tbpila AS TbP WHERE IdPila_fk_Final=${req.query.Pila} and IdPila_fk_Final=IdPila ORDER BY IdTrazabilidad DESC LIMIT 1`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/ultimoVentas", (req, res) => {
  try {
    let sql = `SELECT Fecha,IdPila_fk,Tilapia FROM controlventa WHERE IdPila_fk= ${req.query.Pila}`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/muestreoEstados", (req, res) => {
  try {
    let sql = `SELECT tb.IdPila_fk,tb.Fecha,tb.Lote,tb.Aprobacion FROM tbmuestreo as tb ORDER BY tb.IdPila_fk DESC LIMIT 1;`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/mostrarUsuarios", (req, res) => {
  try {
    let sql = `SELECT Nombre,Contraseña from tbusuarios`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertMortabilidad", (req, res) => {
  campos = [];
  campos.push(req.query.Id);
  campos.push(req.query.IdPila);
  campos.push(req.query.Cantidad);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.Observaciones);

  const insertar = `CALL insertMortabilidad(${campos[1]},${campos[2]},${campos[3]},'${campos[4]}');`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/pilaCantidadPeces", (req, res) => {
  try {
    let sql = `SELECT CantidadPescados from tbpila where IdPila=${req.IdPila}`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
 
    throw new Error("Error en el metodo GET");
  }
});

app.get("/deleteMortabilidad", (req, res) => {
  let sql = `DELETE FROM tbmortabilidad WHERE IdMortabilidad = ${req.query.IdMortabilidad}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/alevines", (req, res) => {
  try {
    let sql =
      "SELECT IdAlevines, tbP.NombreProveedor,tbA.Lote_Provedor,tbA.Pila_Provedor,tbA.Lote as 'LoteAprotila',tbA.IdPila_fk as 'PilaAprotila',tbE.Nombre_Encargado,tbA.EspeciePescado,TbA.Cantidad,tbA.Fecha from tbingreso_alevines as tbA INNER JOIN tbproveedores as tbP on tbA.IdProvedor_fk= tbP.IdProveedores INNER JOIN tbencargado as tbE on tbA.IdEncargado_fk=tbE.IdEncargado INNER JOIN tbpila as tbPi ON tbA.IdPila_fk=tbPi.IdPila;";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertAlevines", (req, res) => {
  campos = [];
  campos.push(req.query.IdProvedor);
  campos.push(req.query.Lote_Provedor);
  campos.push(req.query.Pila_Provedor);
  campos.push(req.query.LoteAprotila);
  campos.push(req.query.IdPila);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.Especie);
  campos.push(req.query.Cantidad);

  const insertar = `CALL insertAlevine(${campos[0]},${campos[1]},${campos[2]},${campos[3]},${campos[4]},${campos[5]},'${campos[6]}',${campos[7]})`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/updateAlevine", (req, res) => {
  campos = [];
  campos.push(req.query.Id);
  campos.push(req.query.IdProvedor);
  campos.push(req.query.Lote);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.pila);
  campos.push(req.query.Especie);
  campos.push(req.query.Cantidad);

  const update = `UPDATE tbingreso_alevines SET IdProvedor_fk = ${campos[1]}, Lote_Provedor = '${campos[2]}',IdEncargado_fk=${campos[3]}, IdPila_fk = ${campos[4]}, EspeciePescado = '${campos[5]}', Cantidad = ${campos[6]} WHERE tbingreso_alevines IdAlevines = ${campos[0]}`;

  connection.query(update, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/deleteAlevines", (req, res) => {
  let sql = `DELETE FROM tbingreso_alevines WHERE IdAlevines = ${req.query.Id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/inventario", (req, res) => {
  try {
    let sql =
      "Select tbi.IdInventario,tbt.Nombre as 'TipoIngreso',tbi.FechaCompra,tbi.FechaModificacion,tbi.CantidadDisponible,tbi.Entradas,tbi.Salidas,tbi.Precio_Actual,tbi.Precio_Anterior,tbi.Precio_Promedio from tbinventario as tbi INNER JOIN tbtipoingreso as tbt on tbi.IdTipoIngreso_fk=tbt.IdTipo";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertInveConcentrado", (req, res) => {
  campos = [];
  campos.push(req.query.Tipo);
  campos.push(req.query.Cantidad);

  const insertar = `INSERT INTO tbinventaconcentrado (TipoConcentrado,Cantidad,Fecha) VALUES ('${campos[0]}', ${campos[1]}, CURDATE())`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/trazabilidad", (req, res) => {
  try {
    let sql =
      "SELECT tbT.IdTrazabilidad,tbT.Lote,tbT.IdPila_fk_Final,tbT.TipoPez,tbT.Cantidad,tbT.Fecha FROM tbtrazabilidad as tbT";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertTrazabilidad", (req, res) => {
  campos = [];
  campos.push(req.query.PilaInicial);
  campos.push(req.query.IdPila_fk_Final);
  campos.push(req.query.TipoPez);
  campos.push(req.query.Cantidad);

  const insertar = `CALL InsertTrazabilidad(${campos[0]},${campos[1]},'${campos[2]}',${campos[3]})`;

  connection.query(insertar, (err, results) => {

    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/deleteTrazabilidad", (req, res) => {
  let sql = `DELETE FROM tbtrazabilidad WHERE IdTrazabilidad = ${req.query.Id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/lotes", (req, res) => {
  try {
    let sql = "SELECT Lote from tbTrazabilidad";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/muestreo", (req, res) => {
  try {
    let sql =
      "SELECT IdMuestreo, IdPila_fk,Cantidad,Fecha,Peso,tbe.Nombre_Encargado as 'Nombre', Aprobacion FROM `tbmuestreo` as tbM INNER Join tbencargado as tbE WHERE tbM.IdEncargado_fk=tbE.IdEncargado";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

app.get("/insertMuestreo", (req, res) => {
  campos = [];
  campos.push(req.query.Pila);
  campos.push(req.query.Cantidad);
  campos.push(req.query.Fecha);
  campos.push(req.query.Peso);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.Aprobacion);
  campos.push(req.query.Observaciones);
  console.log(req.query.Aprobacion);

  const insertar = `CALL insertMuestreo(${campos[0]},${campos[1]}, curdate(), ${campos[3]}, ${campos[4]}, '${campos[5]}','${campos[6]}');`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
 
  res.send("Consulta exitosa");
});

app.get("/deleteMuestreo", (req, res) => {
  let sql = `DELETE FROM tbmuestreo WHERE IdMuestreo = ${req.query.Id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/mostrarTrazabilidad", (req, res) => {
  var numero = req.query.Lote;
  try {
    let sql = `SELECT tbt.IdPila_fk_Final as 'Final', Cantidad from tbtrazabilidad as tbt where tbt.Lote=${numero}`;
    connection.query(sql, function (error, results, fields) {
      if (error) {
        connection.end();
        throw error;
      }
      res.status(200).json({
        msg: "Mensaje desde el metodo GET",
        results,
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error en el metodo GET");
  }
});

//LOGIN
app.get("/usuarios", (req, res) => {
  try {
    campos = [];
    campos.push(req.query.usuario);
    campos.push(req.query.contraseña);
    const queryusuario = `SELECT tbencargado.IdEncargado,tbencargado.Nombre_Encargado,tbencargado.Usuario,tbencargado.IdCargo_fk FROM tbencargado where Usuario = '${campos[0]}' and Contraseña = '${campos[1]}'`;
    connection.query(queryusuario, (err, resultado) => {
      if (resultado.length !== 0) {
        console.log(resultado);
      res.status(200).json({
        msg: "Ingresado correctamente",
        resultado,
      });
       
      } else {
        res.json({ mensaje: "Datos incorrectos" });
      }
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/mostrarEncargados", (req, res) => {
  try {
    const queryusuario = `SELECT tbencargado.Nombre_Encargado,tbencargado.Contraseña FROM tbencargado`;
    connection.query(queryusuario, (err, resultado) => {
      if (resultado.length !== 0) {
      res.status(200).json({
        msg: "Ingresado correctamente",
        resultado,
      });
       
      } else {
        res.json({ mensaje: "Algo Falló" });
      }
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/insertUser", (req, res) => {
  campos = [];
  campos.push(req.query.Nombre);
  campos.push(req.query.Cedula);
  campos.push(req.query.Contraseña);
  campos.push(req.query.Telefono);
  campos.push(req.query.Rol);
  const insertar = `Insert INTO tbencargado ( Nombre_Encargado, Usuario, Contraseña, Teléfono, IdCargo_fk) values ('${campos[0]}','${campos[1]}','${campos[2]}',${campos[3]},${campos[4]})`;
  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/proveedor", (req, res) => {
  try {
    const queryusuario = `SELECT * from tbproveedores`;
    connection.query(queryusuario, (err, resultado) => {
      if (resultado.length !== 0) {
      res.status(200).json({
        msg: "Return",
        resultado,
      });
       
      } else {
        res.json({ mensaje: "Algo Falló" });
      }
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/insertProveedor", (req, res) => {
  campos = [];
  campos.push(req.query.Tipo);//0
  campos.push(req.query.Nombre);//1
  campos.push(req.query.Direccion);//2
  campos.push(req.query.Provincia);//3
  campos.push(req.query.Canton);//4
  campos.push(req.query.Distrito);//5
  campos.push(req.query.NContacto);//6
  campos.push(req.query.Cedula);//7
  campos.push(req.query.Telefono);//8
  campos.push(req.query.Email);//9
  const insertar = `INSERT INTO tbproveedores(TipoProveedor,NombreProveedor, Dirección, Provincia, Cantón, Distrito, NombreContacto, TipoCedula, Cedula, Telefono, Email) VALUES ('${campos[0]}','${campos[1]}','${campos[2]}','${campos[3]}','${campos[4]}','${campos[5]}','${campos[6]}','Nacional',${campos[7]},${campos[8]},'${campos[9]}')`;
  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/updateProveedor", (req, res) => {
  campos = [];

  campos.push(req.query.Nombre);//0
  campos.push(req.query.Direccion);//1
  campos.push(req.query.NContacto);//2
  campos.push(req.query.Cedula);//3
  campos.push(req.query.Telefono);//4
  campos.push(req.query.Email);//5
  campos.push(req.query.Id);//5
  const insertar = `UPDATE tbproveedores SET NombreProveedor='${campos[0]}',Dirección='${campos[1]}',NombreContacto='${campos[2]}',Cedula=${campos[3]},Telefono=${campos[4]},Email='${campos[5]} where IdProveedores = ${campos[6]}'`;
  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

/*
app.get("/actualizarconcentrado", (req, res) => {
 
  let sql = `UPDATE tbconcentrado SET Proteina = 2% Calcioo WHERE IdConcentrado = ${req.Id};`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});
*/
/*
app.get("/controlventa", (req, res) => {
  let sql = "SELECT * FROM `controlventa`";
  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    }
    for (var i in results) {
      console.log(results[i].Id);
    }
    res.send("Consulta exitosa");
    return results;
  });
});

connection.connect(function (error) {
  console.log("conectado", connection.threadId);
});

app.listen(port, () => {
  console.log("Funciona");
});

app.get("/crear", (req, res) => {
  campos = [];
  campos.push(req.query.Id);
  campos.push(req.query.Encargado);
  campos.push(req.query.Fecha);
  campos.push(req.query.Pila);
  campos.push(req.query.Peso);
  campos.push(req.query.tilapia);
  campos.push(req.query.Precio);
  campos.push(req.query.Total);
  campos.push(req.query.Cliente);
  campos.push(req.query.Telefono);
  campos.push(req.query.MetodoPago);
  const insertar = `INSERT INTO controlventa (Encargado, Fecha, Pila, Peso, tilapia, Precio, Total, Cliente, Teléfono, MétodoPago) VALUES (${campos[1]}, ${campos[2]}, ${campos[3]}, ${campos[4]}, ${campos[5]}, ${campos[6]}, ${campos[7]}, ${campos[8]}, ${campos[9]}, ${campos[10]})`;
  console.log(insertar);

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});
*/
/*const insertar = "INSERT INTO controlventas (Id, Encargado, Fecha, N°Pila, Peso, tilapia, Precio, Total, Cliente, Numero, MetodoPago) VALUES (1, 'Pedro22', 2023-06-07, 3, 500, 2, 1000, 2000, 'Luis', 80963289, 1111)"
    connection.query(insertar, (err,rows)=>{
        if(err) throw err
    })

const eliminar = "DELETE FROM controlventas WHERE Id = 1"
    connection.query(eliminar, (err,rows)=>{
        if(err) throw err
    })*/
/*
const actualizar = "UPDATE controlventas set Encargado = 'Pedro' WHERE Id = 0";
connection.query(actualizar, (err, rows) => {
  if (err) throw err;
});

connection.query("SELECT * from controlventas", (err, rows) => {
  if (err) throw err;
  console.log("Los datos de la tabla son");
  console.log(rows);
});
*/
