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
import PrivateRoute from './router/PrivateRoute';



function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />

          <Route path="/proyectos" element={<PrivateRoute><Proyectos /></PrivateRoute>}/>
          <Route path="/NuevoProyecto" element={<PrivateRoute><NuevoProyecto /></PrivateRoute>}/>
          <Route path="/Usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>}/>
          <Route path="/InscripcionProyecto" element={<PrivateRoute><InscripcionProyecto /></PrivateRoute>}/>
          <Route path="/AprobarUsuarios" element={<PrivateRoute><AprobarUsuarios /></PrivateRoute>}/>

        </Routes>
    </Router>
  );
}

export default App;
