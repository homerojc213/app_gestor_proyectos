import { gql } from '@apollo/client';

const AGREGAR_OBSERVACION = gql`
      mutation agregarObservacion(
        $idObservacion: ID!,
        $observacion: String!
        ) {
            agregarObservacion(
            idObservacion: $idObservacion,
            observacion: $observacion
            ){
                observacion
            }
    }
`;
export { AGREGAR_OBSERVACION };