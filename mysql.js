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
  res.send("Holaaaa");
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
  const insertar = `INSERT INTO controlventa (IdEncargado_fk, Fecha, IdPila_fk, Peso, Tilapia, Precio, Total, Cliente, Telefono, MétodoPago) VALUES (${campos[1]}, '${campos[2]}', ${campos[3]}, ${campos[4]}, ${campos[5]}, ${campos[6]}, ${campos[7]}, '${campos[8]}', '${campos[9]}', '${campos[10]}')`;

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

// TABLA CONCENTRADOS------------------------------------------------

app.get("/concentrados", (req, res) => {
  try {
    let sql =
      "SELECT IdConcentrado,tbTi.Nombre as 'Tipo',Marca,Fecha_Compra,Fecha_Vencimiento,tbP.NombreProveedor as 'Proveedor', Precio,Cantidad_Kilos,Proteina FROM `tbconcentrado` as tbC INNER JOIN tbproveedores as tbP on tbC.IdProveedor_fk=tbP.IdProveedores INNER JOIN tbtipoalimento as tbTi on tbC.IdTipo_fk= tbTi.IdTipo";
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

app.get("/crearconcentrado", (req, res) => {
  try {
    campos = [];
    campos.push(req.query.tipo);
    campos.push(req.query.marca);
    campos.push(req.query.compra);
    campos.push(req.query.vencimiento);
    campos.push(req.query.proveedor);
    campos.push(req.query.precio);
    campos.push(req.query.cantidadkilos);
    campos.push(req.query.proteina);

    const insertar = `INSERT INTO tbconcentrado (Tipo, Marca, Fecha_Compra, Fecha_Vencimiento, IdProveedor_fk, Precio,Cantidad_Kilos, Proteina) VALUES ('${campos[0]}', '${campos[1]}', '${campos[2]}', '${campos[3]}', ${campos[4]}, ${campos[5]}, ${campos[6]},'${campos[7]}')`;

    connection.query(insertar, (err, fields) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("Error");
  }
});

app.get("/borrarconcentrado", (req, res) => {
  let sql = `DELETE FROM tbconcentrado WHERE IdConcentrado = ${req.query.IdConcentrado}`;
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

app.get("/alimentacion", (req, res) => {
  try {
    let sql =
      "SELECT tbA.idAlimentacion,tbE.Nombre_Encargado as 'Encargado', tbA.Fecha,tbA.Tipo_Concentrado, tbA.IdPila_fk as 'Pila',tbA.Total_Kilos as 'Kilos' FROM `tbalimentacion` as tbA INNER JOIN tbencargado as tbE WHERE tbA.IdEncargado_fk=tbE.IdEncargado";
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

app.get("/insertAlimentacion", (req, res) => {
  campos = [];
  campos.push(req.query.IdAlimentacion);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.Fecha);
  campos.push(req.query.Tipo);
  campos.push(req.query.IdPila);
  campos.push(req.query.TotalDiario);

  const insertar = `INSERT INTO tbalimentacion (IdEncargado_fk, Fecha,Tipo_Concentrado, IdPila_fk,Total_Kilos) VALUES (${campos[1]}, '${campos[2]}', '${campos[3]}', ${campos[4]},${campos[5]})`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
});

app.get("/deleteAlimentacion", (req, res) => {
  let sql = `DELETE FROM tbalimentacion WHERE idAlimentacion = ${req.query.id}`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log("Borrado");
});

app.get("/mortabilidad", (req, res) => {
  try {
    let sql =
      "SELECT IdMortabilidad, IdPila_fk as 'IdPila', Cantidad, tbE.Nombre_Encargado, Observaciones FROM `tbmortabilidad` INNER JOIN tbencargado as tbE WHERE tbmortabilidad.IdEncargado_fk=tbE.IdEncargado";
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

  const insertar = `INSERT INTO tbmortabilidad (IdPila_fk, Cantidad, IdEncargado_fk,Observaciones) VALUES (${campos[1]}, ${campos[2]}, ${campos[3]}, '${campos[4]}')`;

  connection.query(insertar, (err, fields) => {
    if (err) throw err;
  });
  res.send("Consulta exitosa");
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
      "SELECT IdAlevines, tbP.NombreProveedor,tbA.Lote_Provedor,tbE.Nombre_Encargado, tbPi.Nombre as 'Pila',tbA.EspeciePescado,TbA.Cantidad from tbingreso_alevines as tbA INNER JOIN tbproveedores as tbP on tbA.IdProvedor_fk= tbP.IdProveedores INNER JOIN tbencargado as tbE on tbA.IdEncargado_fk=tbE.IdEncargado INNER JOIN tbpila as tbPi ON tbA.IdPila_fk=tbPi.IdPila;";
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
  campos.push(req.query.Lote);
  campos.push(req.query.IdEncargado);
  campos.push(req.query.IdPila);
  campos.push(req.query.Especie);
  campos.push(req.query.Cantidad);

  const insertar = `INSERT INTO tbingreso_alevines (IdProvedor_fk, Lote_Provedor, IdEncargado_fk, IdPila_fk,EspeciePescado,Cantidad) VALUES (${campos[0]},'${campos[1]}', ${campos[2]}, ${campos[3]},'${campos[4]}',${campos[5]})`;

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

app.get("/inveConcentrado", (req, res) => {
  try {
    let sql = "SELECT * from tbinventaconcentrado";
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
      "SELECT tbT.IdTrazabilidad,tbT.Lote,tbT.IdPila_fk_Inicial,tbT.IdPila_fk_Final,tbT.Peso,tbT.Fecha,tbT.Cantidad,tbM.Aprobacion FROM tbtrazabilidad as tbT INNER JOIN tbmuestreo as tbM WHERE tbT.IdMuestreo_fk=tbM.IdMuestreo;";
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
  campos.push(req.query.Lote);
  campos.push(req.query.IdPila_fk_Inicial);
  campos.push(req.query.IdPila_fk_Final);
  campos.push(req.query.Peso);
  campos.push(req.query.Cantidad);

  const insertar = `CALL InsertTrazabilidad(${campos[0]},${campos[1]},${campos[2]},${campos[3]},${campos[4]})`;

  connection.query(insertar, (err, fields) => {
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
  campos.push(req.query.Peso);
  campos.push(req.query.Encargado);
  campos.push(req.query.Aprobado);

  const insertar = `INSERT INTO tbmuestreo (IdPila_fk, Cantidad, Fecha, Peso, IdEncargado_fk, Aprobacion) VALUES (${campos[0]},${campos[1]}, CURDATE(), ${campos[2]}, ${campos[3]}, ${campos[4]});`;

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
  var numero= req.query.Lote;
  try {
    let sql =
      `SELECT tbt.IdPila_fk_Inicial as 'Inicial', tbt.IdPila_fk_Final as 'Final' from tbtrazabilidad as tbt where tbt.Lote=${numero}`;
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
