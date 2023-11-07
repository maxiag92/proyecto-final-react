import React from 'react';
import './App.css';
import Cotizador from './Cotizador';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Historial from './Historial';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Cotizador />} />
          <Route path="/history" element={<Historial />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
