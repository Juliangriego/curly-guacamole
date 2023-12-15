/*import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Componente() {
  const [listaDetalle, setListaDetalle] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [solicitanteInput, setSolicitanteInput] = useState('');

  useEffect(() => {
    obtenerDetallesresueltos();
  }, []);


  function obtenerDetallesresueltos() {
    Axios.get(`http://127.0.0.1:3131/enviarDetallesOC/resueltos`)
      .then(response => {
        setListaDetalle(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles:', error);
      });
  }

  const [preciosProveedores, setPreciosProveedores] = useState({
    proveedor1: '',
    proveedor2: '',
    proveedor3: '',
  });

  const [nombresProveedores, setNombresProveedores] = useState({
    nombreProveedor1: '',
    nombreProveedor2: '',
    nombreProveedor3: '',
  });

  // Función para manejar cambios en los precios de los proveedores
  const handlePrecioProveedorChange = (e, proveedor) => {
    setPreciosProveedores({
      ...preciosProveedores,
      [proveedor]: e.target.value,
    });
  };

  // Modifica la función enviarPreciosProveedor en tu componente React

  const enviarPreciosProveedor = (detalle, proveedor, nombreProveedor, precio) => {
    const data = {
      detalle,
      proveedor,
      nombreProveedor,
      precio,
    };
  
    Axios.post('http://127.0.0.1:3131/enviarPreciosProveedor', data)
    .then(response => {
      console.log('Información de precios del proveedor enviada al backend:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la información de precios del proveedor:', error);
    });
}

  function mostrarDetalle(detalle) {
    setDetalleSeleccionado(detalle);
  }

  function buscarPorSolicitante() {
    Axios.get(`http://127.0.0.1:3131/enviarDetallesOC/resueltos/${solicitanteInput}`)
      .then(response => {
        setListaDetalle(response.data);
        setDetalleSeleccionado(null); // Limpiar el detalle seleccionado al buscar por solicitante
      })
      .catch(error => {
        console.error('Error al buscar detalles por solicitante:', error);
      });
  }

  const detalleResuelto = (detalle) => {
    const data = {
      detalle
    };

    Axios.post('http://127.0.0.1:3131/detalleResuelto', data)
    .then(response => {
      console.log('Información de precios del proveedor enviada al backend:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar la información de precios del proveedor:', error);
    });
  }

  function fechaFormateada(detalle){
    const fecha = detalle.split('T')[0];
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}-${mes}-${anio}`;
  }


  const agregarDetalle = () => {
    const detalleActual = { solicitante, articulo, cantidad, observaciones };
    setListaDetalle([...listaDetalle, detalleActual]);
    // Limpiar campos de entrada después de agregar el detalle
    setSolicitante('');
    setArticulo('');
    setCantidad('');
    setObservaciones('');
  };


  function mostrarDetalles() {
    if (detalleSeleccionado) {
      return (
        <div>
          
          <div>
            <p>Precio proveedor 1:</p>
            <input
                type="text"
                value={preciosProveedores.proveedor1}
                onChange={(e) => handlePrecioProveedorChange(e, 'proveedor1')}
              />
              <input
                type="text"
                value={nombresProveedores.proveedor1}
                onChange={(e) => setNombresProveedores({ ...nombresProveedores, proveedor1: e.target.value })}
              />
              <button
                onClick={() =>
                  enviarPreciosProveedor(
                    detalleSeleccionado,
                    'proveedor1',
                    nombresProveedores.proveedor1,
                    preciosProveedores.proveedor1
                  )
                }
              >
                Enviar Precio Proveedor 1
              </button>

            <p>Precio proveedor 2:</p>
            <input
                type="text"
                value={preciosProveedores.proveedor2}
                onChange={(e) => handlePrecioProveedorChange(e, 'proveedor2')}
              />
              <input
                type="text"
                value={nombresProveedores.proveedor2}
                onChange={(e) => setNombresProveedores({ ...nombresProveedores, proveedor2: e.target.value })}
              />
              <button
                onClick={() =>
                  enviarPreciosProveedor(
                    detalleSeleccionado,
                    'proveedor2',
                    nombresProveedores.proveedor2,
                    preciosProveedores.proveedor2
                  )
                }
              >
                Enviar Precio Proveedor 2
              </button>

            <p>Precio proveedor 3:</p>
            <input
                type="text"
                value={preciosProveedores.proveedor3}
                onChange={(e) => handlePrecioProveedorChange(e, 'proveedor3')}
              />
              <input
                type="text"
                value={nombresProveedores.proveedor3}
                onChange={(e) => setNombresProveedores({ ...nombresProveedores, proveedor3: e.target.value })}
              />
              <button
                onClick={() =>
                  enviarPreciosProveedor(
                    detalleSeleccionado,
                    'proveedor3',
                    nombresProveedores.proveedor3,
                    preciosProveedores.proveedor3
                  )
                }
              >
                Enviar Precio Proveedor 3
              </button>
              <button
                onClick={() =>
                  detalleResuelto(
                    detalleSeleccionado,
                    'proveedor3',
                    nombresProveedores.proveedor3,
                    preciosProveedores.proveedor3
                  )
                }
              >
                Detalle resuelto
              </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Detalle N°</th>
                  <th scope="col">Fecha Solicitante</th>
                  <th scope="col">Fecha Cotizado</th>
                  <th scope="col">Fecha Co</th>
                  <th scope="col">Artículo</th>
                  <th scope="col">Proveedor 1</th>
                  <th scope="col">Pr Prov 1</th>
                  <th scope="col">Proveedor 2</th>
                  <th scope="col">Pr Prov 2</th>
                  <th scope="col">Proveedor 3</th>
                  <th scope="col">Pr Prov 3</th>
                  <th scope="col">Observación</th>}
                </tr>
              </thead>
              {listaDetalle.map((detalle, index) => (
                <tbody>
                  <tr key={index} onClick={() => mostrarDetalle(detalle)}>
                    <th scope="row">{detalle.detalle_id} </th>
                    
                    <td>{fechaFormateada(detalle.fecha_solicitud)}</td>
                    <td>{fechaFormateada(detalle.fecha_cotizacion)}</td> 
                    <td>{detalle.nombreProveedor}</td> 
                    <td>{detalle.articulo}</td> 
                    <td></td>
                   
                  </tr>
                </tbody>
              ))}
            </table>
            <p>Selecciona un detalle o ingresa un solicitante para buscar.</p> 
          </div>
      );
    }
  }
  
  return (
    <div>
      <h1>Compras pendientes</h1>
      <div className="col">
          <div className="row align-items-start">
            <div className="col-3">
              <ul>
                {listaDetalle.map((detalle, index) => (
                  <li key={index} onClick={() => mostrarDetalle(detalle)}>
                    Fecha: {new Date(detalle.fecha).toLocaleDateString()} - Solicitante: {detalle.nombre_solicitante}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-9">
            {mostrarDetalles()}
            </div>
          </div>
      </div>
      <label className="form-label">Solicitante que desea ver</label>
      <input
        type="text"
        value={solicitanteInput}
        onChange={(e) => setSolicitanteInput(e.target.value)}
      />
      <button type="button" onClick={buscarPorSolicitante}>
        Buscar por Solicitante
      </button>
    </div>
  );
}

export default Componente;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutorizacionCompras = () => {
  const [detallesParaAutorizar, setDetallesParaAutorizar] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al backend para obtener detalles para autorizar
    axios.get('/api/detallesParaAutorizar')
      .then((response) => {
        setDetallesParaAutorizar(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles para autorizar:', error);
      });
  }, []);

  const handleRadioChange = (detalleIndex, proveedorIndex) => {
    const nuevosDetalles = [...detallesParaAutorizar];
    nuevosDetalles[detalleIndex].proveedores.forEach((proveedor, index) => {
      proveedor.seleccionado = index === proveedorIndex;
    });
    setDetallesParaAutorizar(nuevosDetalles);
  };

  const enviarAutorizacion = (detalleIndex) => {
    const detalle = detallesParaAutorizar[detalleIndex];
    const proveedorSeleccionado = detalle.proveedores.find((proveedor) => proveedor.seleccionado);
    
    // Realizar la solicitud POST al backend para actualizar la fecha de autorización
    axios.post('/api/autorizarCompra', {
      id_detalle: detalle.id_detalle,
      proveedor_seleccionado: proveedorSeleccionado,
    })
    .then((response) => {
      console.log('Compra autorizada:', response.data);
    })
    .catch((error) => {
      console.error('Error al autorizar la compra:', error);
    });
  };

  return (
    <div>
      {detallesParaAutorizar.map((detalle, detalleIndex) => (
        <div key={detalleIndex}>
          <p>Fecha Solicitud: {detalle.fecha_solicitud}</p>
          <p>Solicitante: {detalle.solicitante}</p>
          <p>Artículo: {detalle.articulo}</p>
          <p>Cantidad: {detalle.cantidad}</p>
          <p>Observación: {detalle.observacion}</p>
          {detalle.proveedores.map((proveedor, proveedorIndex) => (
            <div key={proveedorIndex}>
              <input
                type="radio"
                name={`proveedor_${detalleIndex}`}
                checked={proveedor.seleccionado}
                onChange={() => handleRadioChange(detalleIndex, proveedorIndex)}
              />
              <label>
                {proveedor.nombre} - ${proveedor.precio}
              </label>
            </div>
          ))}
          <button onClick={() => enviarAutorizacion(detalleIndex)}>Autorizar Compra</button>
        </div>
      ))}
    </div>
  );
};

export default AutorizacionCompras;
