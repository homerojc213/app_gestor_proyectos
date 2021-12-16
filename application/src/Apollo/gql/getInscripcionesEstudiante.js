import { gql} from '@apollo/client';


const GET_INSCRIPCIONES_ESTUDIANTE = gql`

        query InscripcionesPorEstudiante($id: ID!){
            InscripcionesPorEstudiante(id: $id)
            {
                id
                idProyecto{
                    id
                }
            }
        }
    `;

export { GET_INSCRIPCIONES_ESTUDIANTE };