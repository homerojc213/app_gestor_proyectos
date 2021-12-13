import { gql} from '@apollo/client';

const GET_PROYECTOS = gql`
    query {
            Proyectos {
                id
                nombre
                fechaInicio
                fechaFin
                objGeneral
                objEspecificos
                presupuesto
                estadoProyecto
                fase
            }
    }
`;

export default GET_PROYECTOS;