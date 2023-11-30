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
    Axios.get(`http://127.0.0.1:3131/enviarDetallesOC/sinResolver`)
      .then(response => {
        setListaDetalle(response.data);
      })
      .catch(error => {
        console.error('Error al obtener detalles:', error);
      });
  }

  function mostrarDetalle(detalle) {
    setDetalleSeleccionado(detalle);
  }

  function buscarPorSolicitante() {
    Axios.get(`http://127.0.0.1:3131/enviarDetallesOC/sinResolver/${solicitanteInput}`)
      .then(response => {
        setListaDetalle(response.data);
        setDetalleSeleccionado(null); // Limpiar el detalle seleccionado al buscar por solicitante
      })
      .catch(error => {
        console.error('Error al buscar detalles por solicitante:', error);
      });
  }

  const mostrarDetalles = () => {
    if (detalleSeleccionado) {
      return (
        <div>
          <p>Artículo: {detalleSeleccionado.articulo}</p>
          <p>Cantidad: {detalleSeleccionado.cantidad}</p>
          <p>Observación: {detalleSeleccionado.observacion}</p>
        </div>
      );
    } else {
      return <p>Selecciona un detalle o ingresa un solicitante para buscar.</p>;
    }
  };

  return (
    <div>
      <div className="col">
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col">
              <ul>
                {listaDetalle.map((detalle, index) => (
                  <li key={index} onClick={() => mostrarDetalle(detalle)}>
                    Fecha: {new Date(detalle.fecha).toLocaleDateString()} - Solicitante: {detalle.nombre_solicitante}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              {mostrarDetalles()}
            </div>
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

export default Componente;
