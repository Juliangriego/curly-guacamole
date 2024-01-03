const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "chu",
  password: "l0.DqgeWXkHHQQ5g",
  database: "db_empresa",
  waitForConnections: true,connectionLimit: 10,queueLimit: 0
});

app.listen(3131, () => {console.log("Ejecutando backend en puerto 3131");});

app.post("/Formulario/crearDetalle", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const solicitante = req.body[0].solicitante;
  const values = req.body.map((x) => [solicitante, x.articulo, x.cantidad, x.observaciones, fechaActual]);
  const qInsertDetalle = 'INSERT INTO tb_detalles (solicitante, articulo, cantidad, observacion, fecha_solicitud) VALUES ?';
  db.query(qInsertDetalle, [values], (err, results) => {
    if (err) {
      console.error('Error al insertar detalles:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Detalles ingresados correctamente');
    }
  });
});

//Módulo Compras
app.get("/Compras/sinResolver", (req, res) => {
  const qSelect = 'SELECT * FROM tb_detalles WHERE fecha_cotizacion IS NULL'; // Consulta para seleccionar todos los detalles sin resolver
  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/Compras/sinResolver/:id", (req, res) => {
  const nombreSolicitante = req.params.id;
  const qSelect = 'SELECT * FROM tb_detalles WHERE fecha_cotizacion IS NULL AND solicitante = ?'; // Consulta para seleccionar los detalles por nombre de solicitante sin resolver
  db.query(qSelect, [nombreSolicitante], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      res.status(200).json(result);
    }
  });
});

//Módulo Autorizaciones
app.post("/Compras/enviarPreciosProveedor", (req, res) => {
  const fechaCotizado = new Date().toISOString().split('T')[0]; // Obtiene solo la fecha sin hora
  const detalleId = req.body.detalle.id_detalle;
  const nombreProveedor = req.body.nombreProveedor;
  const precio = req.body.precio;
  const qInsertPrecioProveedor = 'UPDATE tb_detalles SET fecha_cotizacion = ? WHERE id_detalle = ?';
  db.query(qInsertPrecioProveedor, [fechaCotizado,detalleId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al insertar fecha proveedor");
    } else {
      // Insertar en proveedor_precio por cada proveedor
      const qInsertProveedorPrecio = "INSERT INTO tb_proveedores (id_detalle, nombre_proveedor, precio_proveedor) VALUES (?, ?, ?)";
      db.query(qInsertProveedorPrecio, [detalleId, nombreProveedor, precio], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error al insertar proveedor precio");
        } else {
          res.status(200).send('Precio proveedor ingresado correctamente');
        }
      });
    }
  });
});

app.get("/Autorizaciones/Resueltas", (req, res) => {
  const qSelectDetalles = 'SELECT id_detalle, articulo, cantidad, observacion FROM tb_detalles WHERE fecha_aprobacion IS NULL AND fecha_cotizacion IS NOT NULL;';
  db.query(qSelectDetalles, (err, detallesResult) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      const detallesConProveedores = [];
      const promises = detallesResult.map((detalle) => {
        return new Promise((resolve, reject) => {
          const qSelectProveedores = 'SELECT nombre_proveedor, precio_proveedor FROM tb_proveedores WHERE id_detalle = ?;';
          db.query(qSelectProveedores, [detalle.id_detalle], (err, proveedoresResult) => {
            if (err) {
              console.error(err);
              reject("Error al obtener proveedores");
            } else {
              detallesConProveedores.push({ ...detalle, proveedores: proveedoresResult });
              resolve();
            }
          });
        });
      });

      Promise.all(promises)
        .then(() => {
          res.status(200).json(detallesConProveedores);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error al obtener detalles con proveedores");
        });
    }
  });
});

app.post("/Autorizaciones/enviarPreciosProveedor", (req, res) => {
  const fechaAprobado = new Date().toISOString().split('T')[0]; // Obtiene solo la fecha sin hora
  const detalleId = req.body.detalle;
  const nombreProveedor = req.body.nombreProveedor;
  const precio = req.body.precio;
  const qInsertPrecioProveedor = 'UPDATE tb_detalles SET fecha_aprobacion = ?, proveedor_aprobado = ?, precio = ? WHERE id_detalle = ?';
  db.query(qInsertPrecioProveedor, [fechaAprobado, nombreProveedor, precio, detalleId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al insertar información de proveedor aprobado");
    } else {
      console.log(fechaAprobado, nombreProveedor, precio, detalleId)
      res.status(200).send('Información de proveedor aprobado actualizada correctamente');
    }
  });
});

app.post("/Compras/detalleResuelto", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const qUpdateDetalle = 'UPDATE tb_detalles SET fecha_cotizacion=? WHERE id_detalle =?';
  const id = req.body.id_detalle;
  db.query(qUpdateDetalle, [fechaActual, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar detalle:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Detalle actualizado correctamente');
    }
  });
});

app.post("/Consultas/Consulta", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const qUpdateDetalle = 'DESCRIBE tb_detalles';
  const id = req.body.id_detalle;
  db.query(qUpdateDetalle, [fechaActual, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar detalle:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Detalle actualizado correctamente');
    }
  });
});

app.get("/Consultas/Respuesta", (req, res) => {
  const qSelect = 'SELECT * FROM tb_detalles'; // Consulta para seleccionar los detalles por nombre de solicitante sin resolver
  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      res.status(200).json(result);
    }
  });
});