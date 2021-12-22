import { gql } from '@apollo/client';

const AGREGAR_OBSERVACION = gql`
      mutation agregarObservacion(
        $idAvance: ID!,
        $observacion: String!
        ) {
            agregarObservacion(
            idAvance: $idAvance,
            observacion: $observacion
            ){
                descripcion
            }
    }
`;
export { AGREGAR_OBSERVACION };