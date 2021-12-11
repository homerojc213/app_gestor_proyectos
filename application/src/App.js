import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NuevoProyecto } from './components/NuevoProyecto';
import { Proyectos } from './components/Proyectos';
import { Usuarios } from './components/Usuarios';
import { Inicio } from './components/Inicio';
import { Login } from './components/Login';
import { InscripcionProyecto } from './components/InscripcionProyecto';
import { AprobarUsuarios } from './components/AprobarUsuarios';



function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/Proyectos" element={<Proyectos />} />
          <Route path="/NuevoProyecto"  element={<NuevoProyecto />} />
          <Route path="/Usuarios"  element={<Usuarios />} />
          <Route path="/Login"  element={<Login />} />
          <Route path="/InscripcionProyecto"  element={<InscripcionProyecto/>} />
          <Route path="/AprobarUsuarios"  element={<AprobarUsuarios/>} />

        </Routes>
    </Router>
  );
}

export default App;
