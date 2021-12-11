import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";


// el signo ! significa que el argumento es obligatorio
const typeDefs = `   

    type Query {
        Usuarios: [Usuario]
        Proyectos: [Proyecto]
        ProyectosPorLider(id: ID!): [Proyecto]
        Inscripciones: [Inscripcion]
        Avances: [Avance]
        
        
    }

    type Mutation {
        login(correo: String!, clave: String!): Token!
        agregarUsuario(usuario: UsuarioInput): Usuario,
        aprobarUsuario(id: ID!): Usuario,
        actualizarUsuario(id: ID!, usuario: UsuarioActInput): Usuario
        eliminarUsuario(id: ID!): Usuario
        agregarProyecto(proyecto: ProyectoInput): Proyecto
        aprobarProyecto(id: ID!): Proyecto
        terminarProyecto(id: ID!): Proyecto
        actualizarProyecto(id: ID!, proyecto: ProyectoActInput): Proyecto 
        eliminarProyecto(id: ID!): Proyecto
        agregarInscripcion(inscripcion: InscripcionInput): Inscripcion
        aprobarInscripcion(id: ID!): Inscripcion
        eliminarInscripcion(id: ID!): Inscripcion
        agregarAvance(idProyecto: ID!, descripcion: String!): Proyecto
        actualizarAvance(id: ID!, descripcion: String!): Avance
        agregarObservacion(idAvance: ID!, observacion: String!): Avance
        eliminarAvance(id: ID!): Avance

    }


    type Token{
        token: String
        error: String
    }

    type Proyecto {
        id: ID!
        nombre: String
        presupuesto: Float
        fechaInicio: String
        fechaFin: String
        objGeneral: String
        objEspecificos: [String]
        idLider: Usuario
        estadoProyecto: String
        fase: String
        avances: [Avance]
    }

    type Usuario{
        id: ID,
        nombres: String,
        apellidos: String,
        identificacion: String,
        correo: String,
        clave: String,
        rol: String,
        estado: String,
    }

   

    type Inscripcion{
        id: ID,
        estadoInscripcion: String,
        fechaIngreso: String,
        idProyecto: Proyecto,
        idEstudiante: Usuario
    }

    type Avance{
        id: ID,
        descripcion: String,
        fecha_avance: String,
        idProyecto: Proyecto,
        observaciones: [Observacion]
    }

    type Observacion{
        observacion:String,
        fechaObservacion: String
     }

    
    input UsuarioInput {
        nombres: String!,
        apellidos: String!,
        identificacion: String!,
        correo: String!,
        clave: String!,
        rol: String!
    }

    input UsuarioActInput{
        nombres: String,
        apellidos: String,
        identificacion: String,
        correo: String,
        clave: String
    }

    input ProyectoInput {
        nombre: String!,
        presupuesto: Float!,
        objGeneral: String!,
        objEspecificos: [String],
        idLider: ID!
    }

    input ProyectoActInput{
        nombre: String,
        presupuesto: Float,
        objGeneral: String,
        objEspecificos: [String]
    }

    input InscripcionInput {
        idProyecto: ID!,
        idEstudiante: ID!
    }

    


`;

export default makeExecutableSchema({ 
    typeDefs: [typeDefs],
    resolvers: resolvers
});
