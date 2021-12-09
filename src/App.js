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


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Proyectos />} />
          <Route path="/Proyectos" element={<Proyectos />} />
          <Route path="/NuevoProyecto"  element={<NuevoProyecto />} />
          <Route path="/Usuarios"  element={<Usuarios />} />
        </Routes>
    </Router>
  );
}

export default App;
