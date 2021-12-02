//Esquema mongoose para proyectos
const {Schema, model} = require('mongoose');

const avanceSchema = new Schema({
    
    descripcion: {
        type: String,
        required: true
    },
    fecha_avance: {
        type: String,
        required: true
    },
    idProyecto: {
        type: String,
        required: true
    },
    observaciones: {
        type: [String],
        required: true
    }
    
},
{
    collection: 'Avances'
});

module.exports = model('Avance', avanceSchema);

