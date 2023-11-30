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
    Axios.post("http://127.0.0.1:3131/ingresoDetalleOC", listaDetalle).then(() => {alert("Detalle enviado al Orden de Compra");});}

  return (
    <div>
      <form>
        <div className="container text-center">
          <div className="col">
          <label className="form-label">Solicitante</label>
              <input type="text" value={solicitante} onChange={ingresoSolicitante} />
            <div className="col">
              <label className="form-label">Artículo</label>
              <input type="text" value={articulo} onChange={ingresoArticulo} />
            </div>
            <div className="col">
              <label className="form-label">Cantidad</label>
              <input type="text" value={cantidad} onChange={ingresoCantidad} />
            </div>
            <div className="col">
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