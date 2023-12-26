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


/*
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Componente() {
  const [listaDetalle, setListaDetalle] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [solicitanteInput, setSolicitanteInput] = useState('');

  useEffect(() => {
    obtenerDetallesSinResolver();
  }, []);

  function obtenerDetallesSinResolver() {
    Axios.get(`http://127.0.0.1:3131/Autorizaciones/Resueltas`)
      .then(response => {
        setListaDetalle(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles:', error);
      });
  }

  const enviarSeleccion = (detalle, proveedorSeleccionado) => {
    const data = {
      detalle,
      proveedorSeleccionado,
    };

    Axios.post('http://127.0.0.1:3131/Autorizaciones/enviarSeleccion', data)
      .then(response => {
        console.log('Selección enviada al backend:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar la selección:', error);
      });
  };

  function handleChangeProveedorSeleccionado(e, detalle) {
    const proveedorSeleccionado = e.target.value;
    enviarSeleccion(detalle, proveedorSeleccionado);
  }

  function enviarOpcionSeleccionada(detalle, proveedorSeleccionado) {
    enviarSeleccion(detalle, proveedorSeleccionado);
    // Aquí podrías realizar otras acciones si es necesario después de enviar la selección
  }


  function renderDetalles() {
    if (!detalleSeleccionado) {
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Artículo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Observación</th>
                <th scope="col">Seleccionar proveedor</th>
              </tr>
            </thead>
            <tbody>
              {listaDetalle.map((detalle, index) => (
                <tr key={index}>
                  <td>{new Date(detalle.fecha_solicitud).toLocaleDateString()}</td>
                  <td>{detalle.solicitante}</td>
                  <td>{detalle.articulo}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.observacion}</td>
                  <td>
                    <div>
                      <input
                        type="radio"
                        name={`proveedor_${index}`}
                        value="proveedor1"
                        onChange={(e) => handleChangeProveedorSeleccionado(e, detalle)}
                      />
                      <label htmlFor={`proveedor_${index}_1`}>Proveedor 1</label>
                      
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`proveedor_${index}`}
                        value="proveedor2"
                        onChange={(e) => handleChangeProveedorSeleccionado(e, detalle)}
                      />
                      <label htmlFor={`proveedor_${index}_2`}>Proveedor 2</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`proveedor_${index}`}
                        value="proveedor3"
                        onChange={(e) => handleChangeProveedorSeleccionado(e, detalle)}
                      />
                      <label htmlFor={`proveedor_${index}_3`}>Proveedor 3</label>
                    </div>
                    <button onClick={() => enviarOpcionSeleccionada(detalle, detalle.proveedorSeleccionado)}>
                        Enviar Selección
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      );
    }
    // Aquí podrías renderizar los detalles del elemento seleccionado si lo necesitas
    return null;
  }

  return (
    <div>
      <h1>Compras pendientes</h1>
      {renderDetalles()}

    </div>
  );
}

export default Componente;
*/