import { gql} from '@apollo/client';


const GET_PROYECTOS_LIDER = gql`
        query ProyectosPorLider($id: ID!){
            ProyectosPorLider(id: $id){
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

export default GET_PROYECTOS_LIDER;