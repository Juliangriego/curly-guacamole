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


const router = createBrowserRouter([
  {
    path: "/FormularioOC",
    element: <FormularioOC />,
  },
  {
    path: "/ModuloCompras",
    element: <ModuloCompras />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

reportWebVitals();
