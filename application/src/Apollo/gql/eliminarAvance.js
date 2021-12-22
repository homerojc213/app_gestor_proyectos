import { gql} from '@apollo/client';

const ELIMINAR_AVANCE = gql`
      mutation eliminarAvance(
          $idAvance: ID!,
          $idProyecto: ID!
        ){
            eliminarAvance(
            idAvance: $idAvance,
            idProyecto: $idProyecto
        ){
            id
        }
    }
`;


export { ELIMINAR_AVANCE };