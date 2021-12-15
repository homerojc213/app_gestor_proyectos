import { gql} from '@apollo/client';

const AGREGAR_USUARIO = gql `
      mutation agregarUsuario(
        $nombres: String!,
        $apellidos: String!
        $identificacion: String!,
        $correo: String!
        $clave: String!,
        $rol: String!
        $estado: String!
      ) {
          agregarUsuario(nombres: $nombres, apellidos: $apellidos, identificacion: $identificacion, correo: $correo, clave: $clave, rol: $rol, estado: $estado)
        {
          nombres
          apellidos
          identificacion
          correo
          clave
          rol
          estado
        }
      }
  `;

export { AGREGAR_USUARIO };