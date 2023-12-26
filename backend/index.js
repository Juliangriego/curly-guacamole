const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "chu",
  password: "l0.DqgeWXkHHQQ5g",
  database: "db_empresa",
  //waitForConnections: true,connectionLimit: 10,queueLimit: 0
});

app.listen(3131, () => {
  console.log("Ejecutando backend en puerto 3131");
});

app.post("/Formulario/crearDetalle", (req, res) => {
  console.log(req.body);
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

app.post("/Compras/resolver", (req, res) => {
  const fechaCotizado = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const detalleId = req.body.detalle.id_detalle;
  const proveedores = req.body.proveedores;
  const qInsertPrecioProveedor = 'INSERT INTO tb_detalles (detalle_id, fecha_cotizado) VALUES (?, ?)';
  db.query(qInsertPrecioProveedor, [detalleId, fechaCotizado], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al insertar precio proveedor");
    } else {
      for (const proveedor of proveedores) {
        const { nombreProveedor, precio } = proveedor;
        const qInsertProveedorPrecio = "INSERT INTO proveedor_precio (id_detalle, proveedor, precio) VALUES (?, ?, ?)";
        db.query(qInsertProveedorPrecio, [detalleId, nombreProveedor, precio], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error al insertar proveedor precio");
          }
        });
      }
      res.status(200).send('Precios proveedores ingresados correctamente');
    }
  });
});

//Módulo Autorizaciones
app.post("/Compras/enviarPreciosProveedor", (req, res) => {
  console.log(req.body);

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
  const qSelect = 'SELECT id_detalle from tb_detalles WHERE fecha_aprobacion IS NULL AND fecha_cotizacion IS NOT NULL;';
  db.query(qSelect, (err, result) => {
    result.map((pepe, indice) => console.log(pepe.id_detalle));
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      const qSelect1 = ' SELECT * FROM tb_proveedores WHERE id_detalle = ?;'
      db.query(qSelect, [nombreSolicitante], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error al obtener detalles");
        } else {
          res.status(200).json(result);
        }
      });
      res.status(200).json(result);
    }
  });
});

app.post("/Autorizaciones/enviarSeleccion", (req, res) => {
  console.log(req);
  db.query(qUpdateDetalle, [fechaActual, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar detalle:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      res.status(200).send('Detalle actualizado correctamente');
    }
  });
});

app.get("/Autorizaciones/sinResolver/:id", (req, res) => {
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




app.get("/enviarDetallesOC/resueltos", (req, res) => {
  const qSelect = 'SELECT tb_precios_proveedor.detalle_id, tb_precios_proveedor.nombreProveedor, tb_precios_proveedor.precio, tb_precios_proveedor.fecha_solicitud, tb_precios_proveedor.fecha_cotizado, tb_detalles.solicitante, tb_detalles.articulo FROM tb_precios_proveedor JOIN tb_detalles ON tb_precios_proveedor.detalle_id = tb_detalles.id_detalle WHERE tb_precios_proveedor.fecha_cotizado IS NOT NULL';
  db.query(qSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener detalles");
    } else {
      res.status(200).json(result);
    }
  });
});
