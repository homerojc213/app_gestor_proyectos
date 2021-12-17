import { gql} from '@apollo/client';

const APROBARINSCRIPCION = gql `
      mutation aprobarInscripcion($id: ID!){
        aprobarInscripcion(
            id: $id
        ){
            id
           
        }
    }
`;


export { APROBARINSCRIPCION };