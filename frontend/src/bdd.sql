-- Crear la base de datos db_empresa
CREATE DATABASE db_empresa;

-- Seleccionar la base de datos creada
USE db_empresa;

-- Crear la tabla tb_detalles
CREATE TABLE tb_detalles (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  solicitante VARCHAR(20),
  articulo VARCHAR(100),
  cantidad VARCHAR(100),
  observacion VARCHAR(255),
  fecha_solicitud DATE,
  fecha_cotizacion DATE,
  fecha_aprobacion DATE,
  proveedor_aprobado VARCHAR(100),
  precio DECIMAL(10, 2)
);

-- Crear la tabla tb_proveedores
CREATE TABLE tb_proveedores (
  id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
  id_detalle INT,
  FOREIGN KEY (id_detalle) REFERENCES tb_detalles(id_detalle),
  nombre_proveedor VARCHAR(100),
  precio_proveedor DECIMAL(10, 2)
);

