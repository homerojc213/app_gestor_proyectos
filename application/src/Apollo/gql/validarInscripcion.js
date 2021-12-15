import { gql} from '@apollo/client';

const VALIDAR_INSCRIPCION = gql `
    query ValidarInscripcion(
        $idProyecto: ID!, 
        $idUsuario: ID!){
        ValidarInscripcion(idProyecto: $idProyecto, idUsuario: $idUsuario)
    }
`;
    

export { VALIDAR_INSCRIPCION };