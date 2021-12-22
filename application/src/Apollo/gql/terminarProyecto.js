import { gql} from '@apollo/client';

const TERMINAR_PROYECTO = gql `
      mutation terminarProyecto($id: ID!){
        terminarProyecto(
            id: $id
        ){
            id
            nombre
            presupuesto
            objGeneral
            objEspecificos
            fechaInicio
            fechaFin
            estadoProyecto
            fase 
        }
    }
`;


export { TERMINAR_PROYECTO };