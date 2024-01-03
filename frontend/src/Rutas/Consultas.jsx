import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Componente() {
  const [listaDetalle, setListaDetalle] = useState([]);
  const [solicitanteInput, setSolicitanteInput] = useState('');
  const [opcion, setOpcion] = useState([]);
 // const Pepe = Object.keys(listaDetalle[0]);

  useEffect(() => {
    // Llamada a la API para obtener las solicitudes de compra cotizadas
    Axios.get('http://127.0.0.1:3131/Consultas/Respuesta')
      .then((response) => {
        setListaDetalle(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles:', error);
      });
  }, []);


  const enviarPreciosProveedor = (detalle, proveedor, nombreProveedor, precio) => {
    const data = {
      detalle,
      proveedor,
      nombreProveedor,
      precio,
    };
  
    Axios.post('http://127.0.0.1:3131/Compras/enviarPreciosProveedor', data)
    .then(response => {
      console.log('Información de precios del proveedor enviada al backend:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la información de precios del proveedor:', error);
    });
}

  return (
    <div>
      <h1>Consultas particulares</h1>
      <div className="col">
          <div className="row align-items-start">
            <div className="col-3">
                <table class="table">
                <thead>
                    <tr>
                        {Object.keys(listaDetalle[0]).map((columna) => 
                        <th scope="col">{columna}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                  console.log(listaDetalle)
                  console.log(listaDetalle[0])
                    {listaDetalle.map((detalle) => (
                      
                        <tr key={detalle.detalle_id}>
                          {console.log(detalle)}
                          {Object.keys(detalle).map((item) => <th key={item}>{item} {console.log(item)}</th>)}
                        </tr>
                    ))}
                </tbody>
                
              </table>
            </div>
            <div className="col-9">
            </div>
          </div>
      </div>
    </div>
  );
}

/*
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
*/

export default Componente;
