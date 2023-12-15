import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComprasPage = () => {
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los detalles de compra al cargar la página
    axios.get('/Compras/sinResolver')
      .then(response => {
        setDetalles(response.data); // Suponiendo que la respuesta es un array de detalles
      })
      .catch(error => {
        console.error('Error fetching detalles:', error);
      });
  }, []);

  const handleEnviar = () => {
    axios.post('/Compras/sinResolver', detalles)
      .then(response => {
        console.log('Datos enviados correctamente:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };

  return (
    <div>
      {detalles.map(detalle => (
        <div key={detalle.id_detalle}>
          <p>ID Detalle: {detalle.id_detalle}</p>
          <p>Fecha de Solicitud: {detalle.fecha_solicitud}</p>
          <p>Solicitante: {detalle.solicitante}</p>
          {/* ...otras propiedades de detalle */}
          <input type="text" placeholder="Proveedor 1" />
          <input type="text" placeholder="Precio Proveedor 1" />
          <input type="text" placeholder="Proveedor 2" />
          <input type="text" placeholder="Precio Proveedor 2" />
          <input type="text" placeholder="Proveedor 3" />
          <input type="text" placeholder="Precio Proveedor 3" />
          <button onClick={handleEnviar}>Enviar</button>
        </div>
      ))}
    </div>
  );
};

export default ComprasPage;
