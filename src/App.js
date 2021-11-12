import './App.css';
import { Smith } from './Presentaciones/Smith';
import { Yuliana } from './Presentaciones/Yuliana';
import { Julio } from './Presentaciones/Julio';

function App() {

  
  return (
    <div className="App">
      <h1 className="App-title">Hola, somos Code Space</h1>
      <Yuliana />
      <Smith />
      <Julio />
    </div>
  );
}

export default App;
