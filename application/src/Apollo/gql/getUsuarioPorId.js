import { gql} from '@apollo/client';


const GET_USUARIO_ID = gql`
        query UsuarioPorId($id: ID!){
            UsuarioPorId(id: $id){
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

export default GET_USUARIO_ID;