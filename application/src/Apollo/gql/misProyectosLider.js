import { gql} from '@apollo/client';

const PROYECTOS_LIDER = gql`
    query {
            Proyectos {
                id
                nombre
                presupuesto
            }
    }
`;

export default PROYECTOS_LIDER;