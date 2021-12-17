import { gql} from '@apollo/client';

const ELIMINARINSCRIPCION = gql `
      mutation eliminarInscripcion($id: ID!){
        eliminarInscripcion(
            id: $id
        ){
            id
        }
    }
`;


export { ELIMINARINSCRIPCION };