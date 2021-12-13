import { gql} from '@apollo/client';


const GET_AVANCES_PROYECTO = gql`
        query AvancesPorProyecto($id: ID!){
            AvancesPorProyecto(id: $id){
                id
                descripcion
                fecha_avance
                observaciones{
                    observacion
                    fechaObservacion
                }
                
               
            }   
        }
    `;

export { GET_AVANCES_PROYECTO };