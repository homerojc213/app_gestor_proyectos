import { gql} from '@apollo/client';


const ACTUALIZARCLAVE= gql `
      mutation actualizarClave(
        $id: ID!
        $clave: String!

        ) {
        actualizarClave(
            id: $id
            clave: $clave
        ) {
            id
            nombres
            apellidos
            identificacion
            correo

        }
    }
`;
       

export { ACTUALIZARCLAVE };