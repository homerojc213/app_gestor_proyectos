import { gql} from '@apollo/client';

const GET_PROYECTOS = gql`
    query {
            Proyectos {
                id
                nombre
                fechaInicio
                objGeneral
                objEspecificos
                presupuesto
                estadoProyecto
                idLider{
                    id
                    nombres
                    apellidos
                }
                fase
               
            }
    }
`;

export default GET_PROYECTOS;