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
  waitForConnections: true,connectionLimit: 10,queueLimit: 0});
app.listen(3131, () => {console.log("Ejecutando backend en puerto 3131");});


app.post("/Formulario/crearDetalle", (req, res) => {
  console.log(req.body);
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const solicitante = req.body[0].solicitante;
  const values = req.body.map((x) => [solicitante,x.articulo,x.cantidad,x.observaciones,fechaActual,]);
  const qInsertDetalle = 'INSERT INTO tb_detalles (solicitante, articulo, cantidad, observacion, fecha_solicitud) VALUES ?';
  db.query(qInsertDetalle, [values], (err, results) => {if (err) {console.error('Error al insertar detalles:', err);res.status(500).send('Error al procesar la solicitud');} else {res.status(200).send('Detalles ingresados correctamente');}});});

// Módulo Formulario
app.post("/ingresoDetalleOC", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const solicitante = req.body[0].solicitante;
  const values = req.body.map((x) => [solicitante,x.articulo,x.cantidad,x.observaciones,fechaActual,]);
  const qInsertDetalle = 'INSERT INTO tb_compras_detalle (nombre_solicitante, articulo, cantidad, observacion, fecha_solicitud) VALUES ?';
  db.query(qInsertDetalle, [values], (err, results) => {if (err) {console.error('Error al insertar detalles:', err);res.status(500).send('Error al procesar la solicitud');} else {res.status(200).send('Detalles ingresados correctamente');}});});

//Módulo Compras
app.get("/Compras/sinResolver", (req, res) => {
  const qSelect = 'SELECT * FROM tb_detalles WHERE fecha_cotizacion IS NULL'; // Consulta para seleccionar todos los detalles sin resolver
  db.query(qSelect, (err, result) => {if (err) {console.error(err);res.status(500).send("Error al obtener detalles");} else {res.status(200).json(result);}});});
app.get("/enviarDetallesOC/sinResolver/:id", (req, res) => {
  const nombreSolicitante = req.params.id;
  const qSelect = 'SELECT * FROM tb_compras_detalle WHERE resuelto = 0 AND nombre_solicitante = ?'; // Consulta para seleccionar los detalles por nombre de solicitante sin resolver
  db.query(qSelect, [nombreSolicitante], (err, result) => {if (err) {console.error(err);res.status(500).send("Error al obtener detalles");} else {res.status(200).json(result);}});});

//Módulo Autorizaciones
app.post("/enviarPreciosProveedor", async (req, res) => {
  try {
    const fechaCotizado = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const detalleId = req.body.detalle.id_compras_detalle;
    const proveedores = req.body.proveedores;

    // Insertar en tb_precios_proveedor
    const qInsertPrecioProveedor = 'INSERT INTO tb_precios_proveedor (detalle_id, fecha_cotizado) VALUES (?, ?)';
    await db.execute(qInsertPrecioProveedor, [detalleId, fechaCotizado]);

    // Insertar en proveedor_precio por cada proveedor
    for (const proveedor of proveedores) {
      const { nombreProveedor, precio } = proveedor;
      const qInsertProveedorPrecio = "INSERT INTO proveedor_precio (id_detalle, proveedor, precio) VALUES (?, ?, ?)";
      await db.execute(qInsertProveedorPrecio, [detalleId, nombreProveedor, precio]);
    }

    res.status(200).send('Precios de proveedores ingresados correctamente');
  } catch (err) {
    console.error('Error al insertar precios de proveedores:', err);
    res.status(500).send('Error al procesar la solicitud');
  }
});


app.post("/detalleResuelto", (req, res) => {
  const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const qUpdateDetalle = 'UPDATE tb_compras_detalle SET fecha_cotizacion=? WHERE id_compras_detalle=?';
  const { detalle } = req.body;
  db.query(qUpdateDetalle, [fechaActual, detalle.id_compras_detalle], (err, results) => {if (err) {console.error('Error al actualizar detalle:', err);res.status(500).send('Error al procesar la solicitud');} else {res.status(200).send('Detalle actualizado correctamente');}});});
app.get("/enviarDetallesOC/resueltos", (req, res) => {  
  const qSelect = 'SELECT tb_precios_proveedor.detalle_id, tb_precios_proveedor.nombreProveedor, tb_precios_proveedor.precio, tb_precios_proveedor.fecha_solicitud, tb_precios_proveedor.fecha_cotizacion, tb_compras_detalle.nombre_solicitante, tb_compras_detalle.articulo, tb_precios_proveedor.proveedor, tb_precios_proveedor.nombreProveedor, tb_precios_proveedor.precio FROM tb_precios_proveedor JOIN tb_compras_detalle ON tb_precios_proveedor.detalle_id = tb_compras_detalle.id_compras_detalle;'; // Consulta para seleccionar todos los detalles sin resolver
  db.query(qSelect, (err, result) => {if (err) {console.error(err);res.status(500).send("Error al obtener detalles");} else {res.status(200).json(result);}});}); 


//Métodos que creo que no se están usando
app.get("/enviarDetallesOC", (req, res) => {
  const qSelect = 'SELECT * FROM tb_compras_detalle'; // Consulta para seleccionar todos los detalles
  db.query(qSelect, (err, result) => {if (err) {console.error(err);res.status(500).send("Error al obtener detalles");} else {res.status(200).json(result);}});});
app.get("/obtenerDetalles", (req, res) => {
  const qSelect = 'SELECT * FROM tb_compras_detalle';
  db.query(qSelect, (err, result) => {if (err) {console.error(err);res.status(500).send("Error al obtener detalles");} else {res.status(200).json(result);}});});