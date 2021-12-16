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
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    idEstudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
},
{
    collection: 'Inscripciones'
});

export default model('Inscripcion', inscripcionSchema);

