import { gql} from '@apollo/client';

const GET_PROYECTOS = gql`
    query {
            Proyectos {
                id
                nombre
                objGeneral
                objEspecificos
                presupuesto
                estadoProyecto
                fase
                estudiantes{
                    id
                    nombres
                }
            }
    }
`;

export default GET_PROYECTOS;