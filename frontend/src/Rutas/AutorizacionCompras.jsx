import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompraAutorizacion = () => {
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las solicitudes de compra cotizadas
    axios.get('http://127.0.0.1:3131/Autorizaciones/Resueltas')
      .then((response) => {
        setDetalles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles:', error);
      });
  }, []);

  const handleSeleccionProveedor = (detalleId, proveedor, precio) => {
    // Función para enviar la selección del proveedor y precio
    axios.post('http://127.0.0.1:3131/Autorizaciones/enviarPreciosProveedor', {
      detalle: detalleId,
      nombreProveedor: proveedor,
      precio: precio,
    })
    .then((response) => {
      console.log('Proveedor y precio seleccionados correctamente');
      // Aquí podrías actualizar el estado o realizar otra acción tras la selección exitosa
    })
    .catch((error) => {
      console.error('Error al seleccionar proveedor y precio:', error);
    });
  };

  return (
    <div>
      <h1>Detalles de Compra para Autorización</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Solicitante</th>
            <th scope="col">Artículo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Observación</th>
            <th scope="col">Proveedores</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{new Date(detalle.fecha_solicitud).toLocaleDateString()}</td>
              <td>{detalle.solicitante}</td>
              <td>{detalle.articulo}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.observacion}</td>
              <td>
                {detalle.proveedores.map((proveedor, proveedorIndex) => (
                  <div key={proveedorIndex} className="proveedor-precio">
                    <input type="radio" name={`proveedor_${detalle.id_detalle}`} value={proveedor.nombre_proveedor} />
                    <span>{proveedor.nombre_proveedor}: {proveedor.precio_proveedor}</span>
                    <button onClick={() => handleSeleccionProveedor(detalle.id_detalle, proveedor.nombre_proveedor, proveedor.precio_proveedor)}>
                      Seleccionar
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default CompraAutorizacion;