//Esquema mongoose para proyectos
import {Schema, model} from 'mongoose';

const inscripcionSchema = new Schema({
    
    estadoInscripcion: {
        type: String,
        required: true
    },
    fechaIngreso: {
        type: String
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

export default model('Inscripcion', inscripcionSchema);

