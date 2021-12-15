//Esquema mongoose para proyectos
import  {Schema, model} from 'mongoose';

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
        type: [ {
            
            observacion:{
             type: String,
             required:true
            } ,
            fechaObservacion:{
              type: String,
              default: Date.now()
            }
             
           }
        ]
    }
    
},
{
    collection: 'Avances'
});

export default model('Avance', avanceSchema);