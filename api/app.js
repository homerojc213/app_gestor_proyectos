const express = require('express');
const app = express();

app.use(express.json({type: '*/*'}));

const puerto = 3010;

app.get("/",
    (req, res) => {
        // CON LA FUNCION .send PUEDO PONER LA INFO QUE YO QUIERA
        res.send('Servicio de BD en funcionamiento')
    }
);

const cors = require('cors');
app.use(cors());

require('./rutas/proyectos.rutas')(app);

app.listen(puerto, () => {
    console.log(`Servicio de BD Monedas escuchando en http://localhost:${puerto}`);
});