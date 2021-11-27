//Esquema mongoose para proyectos
const {Schema, model} = require('mongoose');

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
        type: String,
        required: true
    },
    fechaFin: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    fase: {
        type: String,
        required: true
    }

    
},
{
    collection: 'Proyectos'
});

module.exports = model('Proyecto', proyectoSchema);

