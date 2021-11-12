import './App.css';
import Jhon from './Presentaciones/Jhon';
import { Smith } from './Presentaciones/Smith';
import { Yuliana } from './Presentaciones/Yuliana';

function App() {

  
  return (
    <div className="App">
      <h1 className="App-title">Hola, somos Code Space</h1>
      <Yuliana />
      <Smith />
      <Jhon />
    </div>
  );
}

export default App;
