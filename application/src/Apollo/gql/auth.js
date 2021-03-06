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

const REGISTER= gql `
      mutation agregarUsuarioRegister(
        $nombres: String!,
        $apellidos: String!
        $identificacion: String!,
        $correo: String!
        $clave: String!,
        $rol: String!

      ) {
          agregarUsuarioRegister(nombres: $nombres, apellidos: $apellidos, identificacion: $identificacion, correo: $correo, clave: $clave, rol: $rol)
        {
          nombres
          apellidos
        }
      }
  `;





export {LOGIN, REGISTER};