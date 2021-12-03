//Esquema mongoose para proyectos
const {Schema, model} = require('mongoose');

const inscripcionSchema = new Schema({
    
    estadoInscripcion: {
        type: String,
        required: true
    },
    fechaIngreso: {
        type: String,
        required: true
    },
    idProyecto: {
        type: String,
        required: true
    },
    idEstudiante: {
        type: String,
        required: true
    }
    
},
{
    collection: 'Inscripciones'
});

module.exports = model('Inscripcion', inscripcionSchema);

