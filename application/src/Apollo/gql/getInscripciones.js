import { gql} from '@apollo/client';

const GET_INSCRIPCIONES = gql`
    query {
            Inscripciones {
                id
                idProyecto{
                    id
                    nombre
                }
                idEstudiante{
                    id
                    nombres
                    apellidos
                    identificacion
                    correo
                }
                estadoInscripcion
                fechaIngreso


            }
    }
`;

export default GET_INSCRIPCIONES;