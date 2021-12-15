import { gql} from '@apollo/client';

const ELIMINAR_PROYECTO = gql `
      mutation eliminarProyecto($id: ID!){
        eliminarProyecto(
            id: $id
        ){
            id
        }
    }
`;


export { ELIMINAR_PROYECTO };