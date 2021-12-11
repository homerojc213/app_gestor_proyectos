import { gql} from '@apollo/client';

const LOGIN = gql `
      mutation Login(
        $correo: String!,
        $clave: String!
      ) {
          login( correo: $correo, clave: $clave ) 
        {
          token
          error
        }
      }
  `;

export {LOGIN};