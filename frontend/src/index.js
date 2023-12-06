import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//modulos
import App from './App';
import FormularioOC from './Rutas/Formulario';
import ModuloCompras from './Rutas/ModuloCompras';
import AutorizacionCompras from './Rutas/AutorizacionCompras';
import Inicio from './Rutas/Inicio';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/FormularioOC",
    element: <FormularioOC />,
  },
  {
    path: "/ModuloCompras",
    element: <ModuloCompras />,
  },
  {
    path: "/AutorizacionCompras",
    element: <AutorizacionCompras />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

reportWebVitals();
