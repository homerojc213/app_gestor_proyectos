import { gql} from '@apollo/client';


const ACTUALIZARUSUARIO= gql `
      mutation actualizarUsuario(
        $id: ID!
        $nombres: String!,
        $apellidos: String!,
        $identificacion: String!,
        $correo: String!,

        ) {
        actualizarUsuario(
            id: $id
            nombres: $nombres
            apellidos: $apellidos
            identificacion: $identificacion
            correo: $correo
        ) {
            id
            nombres
            apellidos
            identificacion
            correo

        }
    }
`;
       

export { ACTUALIZARUSUARIO };