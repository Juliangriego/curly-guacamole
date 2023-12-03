const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "chu",
  password: "l0.DqgeWXkHHQQ5g",
  database: "db_empresa",
});

// Conexión
app.listen(3131, () => {
  console.log("Ejecutando backend en puerto 3131");
});

// Métodos POST

app.post("/ingresoDetalleOC", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener fecha actual en formato MySQL
  const solicitante = req.body[0].solicitante;

  // Ingresar el detalle
  const values = req.body.map((x) => [
    solicitante,
    x.articulo,
    x.cantidad,
    x.observaciones,
    fechaActual,
  ]);

  const qInsertDetalle = 'INSERT INTO tb_compras_detalle (nombre_solicitante, articulo, cantidad, observacion, fecha) VALUES ?';
  
  db.query(qInsertDetalle, [values], (err, results) => {
    if (err) {
      console.error('Error al insertar detalles:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      // Éxito al ingresar el detalle
      res.status(200).send('Detalles ingresados correctamente');
    }
  });
});

app.post("/enviarPreciosProveedor", (req, res) => {
  const { detalle, proveedor,nombreProveedor, precio } = req.body;
  const qInsertPrecioProveedor = 'INSERT INTO tb_precios_proveedor (detalle_id, proveedor, nombreProveedor, precio) VALUES (?, ?, ?, ?)';
  console.log(detalle)
  
  db.query(qInsertPrecioProveedor, [detalle.id_compras_detalle, proveedor,nombreProveedor, precio], (err, results) => {
    if (err) {
      console.error('Error al insertar precio del proveedor:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      // Éxito al ingresar el precio del proveedor
      res.status(200).send('Precio del proveedor ingresado correctamente');
    }
  });
});

app.post("/detalleResuelto", (req, res) => {
  const { detalle, proveedor,nombreProveedor, precio } = req.body;
  const qInsertPrecioProveedor = ' UPDATE tb_compras_detalle SET resuelto=? WHERE id_compras_detalle=?';
  console.log(detalle)
  
  db.query(qInsertPrecioProveedor, ['1', detalle.id_compras_detalle], (err, results) => {
    if (err) {
      console.error('Error al insertar precio del proveedor:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      // Éxito al ingresar el precio del proveedor
      res.status(200).send('Precio del proveedor ingresado correctamente');
    }
  });
});

// Métodos Get

app.get("/obtenerDetalles", (req, res) => {
  const qSelect = 'SELECT * FROM tb_compras_detalle'; // Consulta para seleccionar todos los detalles

  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      // Enviar los detalles recuperados como respuesta
      res.status(200).json(result);
    }
  });
});

app.get("/enviarDetallesOC/sinResolver", (req, res) => {
  const qSelect = 'SELECT * FROM tb_compras_detalle WHERE resuelto = 0'; // Consulta para seleccionar todos los detalles sin resolver

  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      // Enviar los detalles sin resolver como respuesta
      res.status(200).json(result);
    }
  });
});

app.get("/enviarDetallesOC/resueltos", (req, res) => {
  const qSelect = 'SELECT * FROM tb_precios_proveedor WHERE autorizado = 0'; // Consulta para seleccionar todos los detalles sin resolver

  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      // Enviar los detalles sin resolver como respuesta
      res.status(200).json(result);
    }
  });
});

app.get("/enviarDetallesOC/sinResolver/:id", (req, res) => {
  const nombreSolicitante = req.params.id; // Obtener el nombre del solicitante desde la URL

  const qSelect = 'SELECT * FROM tb_compras_detalle WHERE resuelto = 0 AND nombre_solicitante = ?'; // Consulta para seleccionar los detalles por nombre de solicitante sin resolver

  db.query(qSelect, [nombreSolicitante], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      // Enviar los detalles recuperados por nombre de solicitante sin resolver como respuesta
      res.status(200).json(result);
    }
  });
});

app.get("/enviarDetallesOC", (req, res) => {
  const qSelect = 'SELECT * FROM tb_compras_detalle'; // Consulta para seleccionar todos los detalles

  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      // Enviar los detalles recuperados como respuesta
      res.status(200).json(result);
    }
  });
});
