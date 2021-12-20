import { gql } from '@apollo/client';

const AGREGAR_AVANCE = gql`
      mutation agregarAvance(
        $idProyecto: ID!,
        $descripcion: String!
        ) {
            agregarAvance(
            idProyecto: $idProyecto,
            descripcion: $descripcion
            ){
                descripcion
            }
    }
`;
export { AGREGAR_AVANCE };