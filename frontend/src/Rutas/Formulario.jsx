import React, { useState } from 'react';
import Axios from 'axios';

function App() {
  const [solicitante, setSolicitante] = useState('');
  const [articulo, setArticulo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [listaDetalle, setListaDetalle] = useState([]);

  const ingresoSolicitante = (evento) => {
    setSolicitante(evento.target.value);
  };

  const ingresoArticulo = (evento) => {
    setArticulo(evento.target.value);
  };
  const ingresoCantidad = (evento) => {
    setCantidad(evento.target.value);
  };
  const ingresoObservacion = (evento) => {
    setObservaciones(evento.target.value);
  };

  const agregarDetalle = () => {
    const detalleActual = { solicitante, articulo, cantidad, observaciones };
    setListaDetalle([...listaDetalle, detalleActual]);
    // Limpiar campos de entrada después de agregar el detalle
    setSolicitante('');
    setArticulo('');
    setCantidad('');
    setObservaciones('');
  };

  const editarDetalle = (index, campo, valor) => {
    const detallesActualizados = listaDetalle.map((detalle, i) => {
      if (i === index) {
        return { ...detalle, [campo]: valor };
      }
      return detalle;
    });
    setListaDetalle(detallesActualizados);
  };

  const mostrarDetalles = () => {
    return listaDetalle.map((detalle, index) => (
      <div key={index}>
        
        <input
          type="text"
          value={detalle.articulo}
          onChange={(e) => editarDetalle(index, 'articulo', e.target.value)}
        />
        <input
          type="text"
          value={detalle.cantidad}
          onChange={(e) => editarDetalle(index, 'cantidad', e.target.value)}
        />
        <input
          type="text"
          value={detalle.observaciones}
          onChange={(e) => editarDetalle(index, 'observaciones', e.target.value)}
        />
      </div>));};

  const enviarDetallesAlBackend = () =>{
    Axios.post("http://127.0.0.1:3131/Formulario/crearDetalle", listaDetalle).then(() => {alert("Detalle enviado al Orden de Compra");});}  
  
  return (
    <div>
      <form>
        <div className="container-fluid ">
          <div className="col">
          <label className="form-label">Solicitante</label>
              <input type="text" value={solicitante} onChange={ingresoSolicitante} />
            <div className="col">
              <label className="form-label">Artículo</label>
              <input type="text" value={articulo} onChange={ingresoArticulo} />
              <label className="form-label">Cantidad</label>
              <input type="text" value={cantidad} onChange={ingresoCantidad} />
              <label className="form-label">Observación</label>
              <input type="text" value={observaciones} onChange={ingresoObservacion} />
              </div>
          </div>
        </div>
        <button type="button" onClick={agregarDetalle}>
          Ingresar
        </button>
      </form>

      <div>{mostrarDetalles()}</div>
      <button type="button" onClick={enviarDetallesAlBackend}>
        Enviar {listaDetalle.length} artículos para aprobar
      </button>
    </div>
  );
}

export default App;

/*import React, { useState } from 'react';
import axios from 'axios';

const FormularioSolicitudCompra = () => {
  const [solicitante, setSolicitante] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [nuevoDetalle, setNuevoDetalle] = useState({
    articulo: '',
    cantidad: '',
    observacion: '',
  });

  const handleInputChange = (e) => {
    setSolicitante(e.target.value);
  };

  const handleDetalleChange = (index, key, value) => {
    const updatedDetalles = [...detalles];
    updatedDetalles[index][key] = value;
    setDetalles(updatedDetalles);
  };

  const agregarDetalle = () => {
    setDetalles([...detalles, { ...nuevoDetalle }]);
    setNuevoDetalle({
      articulo: '',
      cantidad: '',
      observacion: '',
    });
  };

 
  const enviarSolicitud = () => {
      const detallesParaEnviar = detalles.map((detalle) => ({
        articulo: detalle.articulo,
        cantidad: detalle.cantidad,
        observacion: detalle.observacion,
        fecha_solicitud: new Date().toISOString().slice(0, 10), // Obtiene la fecha actual en formato YYYY-MM-DD
    }))
  
      const solicitud = {
        solicitante,
        detalles: detallesParaEnviar,
      };
      axios.post('http://127.0.0.1:3001/api/crearDetalle', solicitud);  
    }
  
  return (
    <div>
      <div>
        <label>Nombre del solicitante:</label>
        <input type="text" value={solicitante} onChange={handleInputChange} />
      </div>
      <div>
        <label>Artículo:</label>
        <input
          type="text"
          value={nuevoDetalle.articulo}
          onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, articulo: e.target.value })}
        />
        <label>Cantidad:</label>
        <input
          type="text"
          value={nuevoDetalle.cantidad}
          onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, cantidad: e.target.value })}
        />
        <label>Observación:</label>
        <input
          type="text"
          value={nuevoDetalle.observacion}
          onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, observacion: e.target.value })}
        />
        <button onClick={agregarDetalle}>Agregar</button>
      </div>
      {detalles.map((detalle, index) => (
        <div key={index}>
          <input
            type="text"
            value={detalle.articulo}
            onChange={(e) => handleDetalleChange(index, 'articulo', e.target.value)}
          />
          <input
            type="text"
            value={detalle.cantidad}
            onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
          />
          <input
            type="text"
            value={detalle.observacion}
            onChange={(e) => handleDetalleChange(index, 'observacion', e.target.value)}
          />
        </div>
      ))}
      <button onClick={enviarSolicitud}>Enviar Solicitud de Compra</button>
    </div>
  );
};

export default FormularioSolicitudCompra;*/