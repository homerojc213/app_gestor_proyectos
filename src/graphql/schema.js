import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";


// el signo ! significa que el argumento es obligatorio
const typeDefs = `   

    type Query {
        Usuarios: [Usuario]
        Proyectos: [Proyecto]
        Inscripciones: [Inscripcion]
    }

    type Mutation {
        agregarUsuario(usuario: UsuarioInput): Usuario,
        actualizarUsuario(id: ID!, usuario: UsuarioInput): Usuario
        actualizarEstadoUsuario(id: ID!, estado: String): Usuario
        eliminarUsuario(id: ID!): Usuario
        agregarProyecto(proyecto: ProyectoInput): Proyecto
        aprobarProyecto(id: ID!): Proyecto
        actualizarProyecto(id: ID!, proyecto: ProyectoInput): Proyecto 
        eliminarProyecto(id: ID!): Proyecto
        agregarInscripcion(inscripcion: InscripcionInput): Inscripcion
        aprobarInscripcion(id: ID!): Inscripcion
        eliminarInscripcion(id: ID!): Inscripcion
    }

    type Proyecto {
        id: ID!
        nombre: String!
        presupuesto: Float!
        fechaInicio: String!
        fechaFin: String!
        objGeneral: String!
        objEspecificos: [String]
        idLider: Usuario!
        estadoProyecto: String!
        fase: String!
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

    
    input UsuarioInput {
        nombres: String!,
        apellidos: String!,
        identificacion: String!,
        correo: String!,
        clave: String!,
        rol: String!
    }

    input ProyectoInput {
        nombre: String!,
        presupuesto: Float!,
        objGeneral: String!,
        objEspecificos: [String],
        idLider: ID!
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