import './App.css';
import { Jhon } from './Presentaciones/Jhon';
import { Smith } from './Presentaciones/Smith';
import { Yuliana } from './Presentaciones/Yuliana';
import { Julio } from './Presentaciones/Julio';
import { Juan } from './Presentaciones/Juan';

function App() {

  
  return (
    <div className="App">
      <h1 className="App-title">Hola, somos Code Space</h1>
      <Yuliana />
      <Smith />
      <Julio />
      <Jhon />
      <Juan />
    </div>
  );
}

export default App;
