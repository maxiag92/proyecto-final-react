import React, { useState, useEffect } from 'react';
import './App.css';

function Historial() {
  const [cotizacion, setCotizaciones] = useState([]);

  useEffect(() => {
    const storedCotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    setCotizaciones(storedCotizaciones);
  }, []);

  const redirectToCotizador = () => {
    window.location.href = '/';
  }

  return (
    <div className="container">
      <h1>Historial de Cotizaciones</h1>
      <button className="boton-historial" onClick={redirectToCotizador}>
        Volver a Cotización
      </button>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo de Propiedad</th>
            <th>Ubicación</th>
            <th>Metros Cuadrados</th>
            <th>Valor de la Propiedad</th>
          </tr>
        </thead>
        <tbody>
          {cotizacion.map((cotizacion, index) => (
            <tr key={index}>
              <td>{cotizacion.date}</td>
              <td>{cotizacion.tipoPropiedad}</td>
              <td>{cotizacion.ubicacion}</td>
              <td>{cotizacion.superficie} m²</td>
              <td>${cotizacion.valorPropiedad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Historial;