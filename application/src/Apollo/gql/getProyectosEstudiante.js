import { gql} from '@apollo/client';

const GET_PROYECTOS_ESTUDIANTE = gql`
        query ProyectosPorEstudiante($id: ID!){
            ProyectosPorEstudiante(id: $id){
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

export { GET_PROYECTOS_ESTUDIANTE } ;