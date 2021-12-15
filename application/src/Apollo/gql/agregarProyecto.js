import { gql} from '@apollo/client';


const AGREGARPROYECTO= gql `
      mutation agregarProyecto(
        $nombre: String!,
        $presupuesto: Float!,
        $objGeneral: String!,
        $objEspecificos: [String]!,
        $idLider: ID!
        ) {
        agregarProyecto(
            nombre: $nombre,
            presupuesto: $presupuesto,
            objGeneral: $objGeneral,
            objEspecificos: $objEspecificos,
            idLider: $idLider
        ) {
            nombre
        }
    }
`;
       





export { AGREGARPROYECTO };