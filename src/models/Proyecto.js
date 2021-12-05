//Esquema mongoose para proyectos
import {Schema, model} from 'mongoose';

const proyectoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Number,
        required: true
    },
    fechaInicio: {
        type: String
    },
    fechaFin: {
        type: String
    },
    objGeneral: {
        type: String,
        required: true
    },
    objEspecificos: {
        type: [String],
        required: true
    },
    idLider: {
        type: String,
        required: true
    },
    estadoProyecto: {
        type: String
    },
    fase: {
        type: String
    }
    
},
{
    collection: 'Proyectos'
});

export default model('Proyecto', proyectoSchema);

