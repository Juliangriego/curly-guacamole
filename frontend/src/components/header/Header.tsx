import React from 'react'
import './header.styles.css'

const Header = () => {
  return (
    <div className='header-container'>
        <a href='/' className='header-button'><span >Inicio</span></a>
        <a href='/FormularioOC' className='header-button'><span >Formulario OC</span></a>
        <a href='/ModuloCompras' className='header-button'><span >Modulo de compras</span></a>
        <a href='/AutorizacionCompras' className='header-button'><span >Autorización de compras</span></a>
        <a href='/Consultas' className='header-button'><span >Consultas personalizadas</span></a>
    </div>  
)}

export default Header