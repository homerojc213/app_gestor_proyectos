import { gql} from '@apollo/client';

const INSCRIBIRSE_PROYECTO = gql `
    mutation agregarInscripcion(
        $idProyecto: ID!, 
        $idUsuario: ID!)
        {
        agregarInscripcion(idProyecto: $idProyecto, idUsuario: $idUsuario){
            estadoInscripcion
        }
    }
`;
    

export { INSCRIBIRSE_PROYECTO };