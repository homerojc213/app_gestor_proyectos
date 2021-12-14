import { gql} from '@apollo/client';

const APROBARUSUARIO = gql `
      mutation aprobarUsuario($id: ID!){
        aprobarUsuario(
            id: $id
        ){
            id
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


export { APROBARUSUARIO };