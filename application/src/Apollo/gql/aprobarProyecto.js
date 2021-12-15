import { gql} from '@apollo/client';

const APROBARPROYECTO = gql `
      mutation aprobarProyecto($id: ID!){
        aprobarProyecto(
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


export { APROBARPROYECTO };