import { gql } from '@apollo/client'

const GET_USUARIOS = gql`
        query {            
            Usuarios {
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

export default GET_USUARIOS;