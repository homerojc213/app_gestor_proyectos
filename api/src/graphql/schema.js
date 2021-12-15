import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

// el signo ! significa que el argumento es obligatorio
const typeDefs = `   

    type Query {
        Usuarios: [Usuario]
        UsuarioPorId(id: ID!): Usuario
        Proyectos: [Proyecto]
        ProyectosPorLider(id: ID!): [Proyecto]
        Inscripciones: [Inscripcion]
        ValidarInscripcion(idProyecto: ID!, idUsuario: ID!): Boolean
        AvancesPorProyecto(id: ID!): [Avance]
    }

    type Mutation {
        login(correo: String!, clave: String!): Token!
        agregarUsuarioRegister(nombres: String!, apellidos: String!, identificacion: String!, correo: String!, clave: String!, rol: String!): Usuario!
        agregarUsuario(nombres: String!, apellidos: String!, identificacion: String!, correo: String!, clave: String!, rol: String!, estado: String!): Usuario!
        aprobarUsuario(id: ID!): Usuario,
        actualizarUsuario(id: ID!, nombres: String!, apellidos: String!, identificacion: String!, correo: String!): Usuario!
        actualizarClave(id: ID!, clave: String!): Usuario!
        eliminarUsuario(id: ID!): Usuario
        agregarProyecto(nombre: String!, presupuesto: Float!, objGeneral: String!, objEspecificos: [String]!, idLider: ID!) : Proyecto!
        aprobarProyecto(id: ID!): Proyecto
        terminarProyecto(id: ID!): Proyecto
        actualizarProyecto(id: ID!, proyecto: ProyectoActInput): Proyecto 
        eliminarProyecto(id: ID!): Proyecto
        agregarInscripcion(idProyecto: ID!, idUsuario: ID!): Inscripcion!
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
        estudiantes: [Usuario]
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

  

    input UsuarioActInput{
        nombres: String,
        apellidos: String,
        identificacion: String,
        correo: String,
        clave: String
    }

  

    input ProyectoActInput{
        nombre: String,
        presupuesto: Float,
        objGeneral: String,
        objEspecificos: [String]
    }

  
    


`;

export default makeExecutableSchema({ 
    typeDefs: [typeDefs],
    resolvers: resolvers
});
