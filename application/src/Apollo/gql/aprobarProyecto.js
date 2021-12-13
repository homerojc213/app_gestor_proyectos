import { gql} from '@apollo/client';


const APROBARPROYECTO = gql `
      mutation aprobarProyecto(
        $_id: ID!,
        ) {
        aprobarProyecto(
            _id: $_id
        )
    }
`;
       
export { APROBARPROYECTO };