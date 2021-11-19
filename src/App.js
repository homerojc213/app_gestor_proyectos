import './App.css';
import Inicio from './inicio/inicio'
import Proyectos from './proyectos/proyectos.modelo'
import Usuarios from './usuarios/usuarios.modelo'
import Inscripciones from './inscripciones/inscripciones.modelo'
import Avances from './avances/avances.modelo'
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route path="/proyectos" component={Proyectos} />
            <Route path="/usuarios" component={Usuarios} />
            <Route path="/inscripciones" component={Inscripciones} />
            <Route path="/avances" component={Avances} />
          </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
