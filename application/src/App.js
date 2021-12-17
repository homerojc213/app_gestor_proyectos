import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import {PrivateRoute, PrivateRouteAdmin, PrivateRouteEstudiante, PrivateRouteLider} from './router/PrivateRoute'; 


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NuevoProyecto } from './components/NuevoProyecto';
import { Proyectos } from './components/Proyectos';
import { Usuarios } from './components/Usuarios';
import { NuevoUsuario } from './components/NuevoUsuario';
import { Inicio } from './components/Inicio';
import { Login } from './components/Login';
import { InscripcionProyecto } from './components/InscripcionProyecto';
import { AprobarUsuarios } from './components/AprobarUsuarios';
import { AprobarProyectos } from './components/AprobarProyectos';
import {MisProyectosLider} from './components/MisProyectosLider';
import { AvancesProyecto } from './components/AvancesProyecto';
import { Perfil } from './components/Perfil';
import { MisProyectosEstudiante } from './components/MisProyectosEstudiante';
import { NuevoAvance } from './components/NuevoAvance';
import { AprobarInscripciones } from './components/AprobarInscripciones';
import { MisInscripciones } from './components/MisInscripciones';


function App() {
  return (
    <Router>
        <Routes>

          <Route exact path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>}/>
          <Route path="/Proyectos" element={<PrivateRoute><Proyectos /></PrivateRoute>} />
          <Route path="/AvancesProyecto/:idProyecto" element={<PrivateRoute><AvancesProyecto /></PrivateRoute>} />
  
          <Route path="/Proyectos/AprobarProyectos" element={<PrivateRouteAdmin><AprobarProyectos /></PrivateRouteAdmin>}/>
          <Route path="/NuevoUsuario" element={<PrivateRouteAdmin><NuevoUsuario /></PrivateRouteAdmin>}/>
          <Route path="/Usuarios" element={<PrivateRouteAdmin><Usuarios /></PrivateRouteAdmin>}/>
          <Route path="/AprobarUsuarios" element={<PrivateRouteAdmin><AprobarUsuarios /></PrivateRouteAdmin>}/>

         
          <Route path="/NuevoProyecto" element={<PrivateRouteLider><NuevoProyecto /></PrivateRouteLider>}/>
          <Route path="/MisProyectosLider" element={<PrivateRouteLider><MisProyectosLider /></PrivateRouteLider>}/>
          <Route path="/AprobarInscripciones" element={<PrivateRouteLider><AprobarInscripciones /></PrivateRouteLider>}/>

      
          <Route path="/InscripcionProyecto" element={<PrivateRouteEstudiante><InscripcionProyecto /></PrivateRouteEstudiante>}/>
          <Route path="/MisProyectosEstudiante" element={<PrivateRouteEstudiante><MisProyectosEstudiante /></PrivateRouteEstudiante>}/>
          <Route path="/MisInscripciones" element={<PrivateRouteEstudiante><MisInscripciones /></PrivateRouteEstudiante>}/>
          <Route path="/NuevoAvance" element={<PrivateRouteEstudiante><NuevoAvance /></PrivateRouteEstudiante>}/>
          
          

        </Routes>
    </Router>
  );
}

export default App;
