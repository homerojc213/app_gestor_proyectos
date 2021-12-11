import { gql} from '@apollo/client';

const GET_PROYECTOS = gql`
    query {
            Proyectos {
                id
                nombre
                presupuesto
            }
    }
`;

export default GET_PROYECTOS;