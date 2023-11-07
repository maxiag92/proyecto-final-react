import React, { Component } from 'react';
import './App.css';
import DatosJson from './DatosJson.json';

class Cotizador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoPropiedad: '',
      ubicacion: '',
      superficie: '',
      valorPropiedad: null,
      selectIncompleto: false,
    };
  }

  handleTipoPropiedadChange = (event) => {
    this.setState({ tipoPropiedad: event.target.value });
  }

  handleUbicacionChange = (event) => {
    this.setState({ ubicacion: event.target.value });
  }

  handleSuperficieChange = (event) => {
    this.setState({ superficie: parseInt(event.target.value, 10) });
  }

  calculateValorPropiedad = () => {
    const { tipoPropiedad, ubicacion, superficie } = this.state;

    if (!tipoPropiedad || !ubicacion || !superficie) {
      this.setState({ selectIncompleto: true });
      return;
    }

    const factorPropiedad = DatosJson.factoresTipoPropiedad[tipoPropiedad] || 1.0;
    const factorUbicacion = DatosJson.factoresUbicacion[ubicacion] || 1.0;
    const factorSuperficie = DatosJson.factoresSuperficie[superficie] || 1.0;

    const valorBase = 1000;
    const valorPropiedad = (valorBase * factorPropiedad * factorUbicacion *factorSuperficie)**2;

    const cotizacion = {
      date: new Date().toLocaleString(),
      tipoPropiedad,
      ubicacion,
      superficie,
      valorPropiedad,
    };

    this.setState({ valorPropiedad });

    let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    cotizaciones.push(cotizacion);
    localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

    this.setState({ selectIncompleto: false });
  }

  redirectToHistory = () => {
    window.location.href = '/history';
  }

  render() {
    return (
      <div className="container">
        <button className="boton-historial" onClick={this.redirectToHistory}>Historial</button>
        <h1>Cotizador de Propiedades</h1>
        <div className="input-container">
          <div className="select-container">
            <label>Seleccionar Propiedad:</label>
            <select onChange={this.handleTipoPropiedadChange} value={this.state.tipoPropiedad}>
              <option value=""> </option>
              {Object.keys(DatosJson.factoresTipoPropiedad).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="select-container">
            <label>Seleccionar Ubicación:</label>
            <select onChange={this.handleUbicacionChange} value={this.state.ubicacion}>
              <option value=""> </option>
              {Object.keys(DatosJson.factoresUbicacion).map((ubicacion) => (
                <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
              ))}
            </select>
          </div>
          <div className="select-container">
            <label>Seleccionar Metros Cuadrados:</label>
            <select onChange={this.handleSuperficieChange} value={this.state.superficie}>
              <option value=""> </option>
              {Object.keys(DatosJson.factoresSuperficie).map((superficie) => (
                <option key={superficie} value={superficie}>{superficie} m²</option>
              ))}
            </select>
          </div>
        </div>
        <button id="boton-cotizar" onClick={this.calculateValorPropiedad}>Cotizar</button>
        {this.state.selectIncompleto && (
          <p className="mensaje-validacion">Por favor, seleccione una opción en todos los campos.</p>)}
        {this.state.valorPropiedad !== null && (
          <p>Valor de la propiedad: $ {this.state.valorPropiedad}</p>
        )}
      </div>
    );
  }
}

export default Cotizador;

