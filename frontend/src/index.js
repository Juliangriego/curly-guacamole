import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//modulos
//import App from './App';
import FormularioOC from './Rutas/Formulario';
import ComprasPage from './Rutas/ComprasPage';
import AutorizacionCompras from './Rutas/AutorizacionCompras';
import Inicio from './Rutas/Inicio';
import ModuloCompras from './Rutas/ModuloCompras';
import Header from './components/header/Header.tsx';
import Consultas from './Rutas/Consultas.jsx'



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
    path: "/ComprasPage",
    element: <ComprasPage />,
  },
  {
    path: "/AutorizacionCompras",
    element: <AutorizacionCompras />,
  },
  {
    path: "/Consultas",
    element: <Consultas />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

reportWebVitals();
