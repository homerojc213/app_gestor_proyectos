const graphql = require('graphql');
const Usuario = require('../models/usuario');
const Proyecto = require('../models/proyecto');
const Avances = require('../models/avance');
const Inscripciones = require('../models/inscripcion');

//const Inscripciones = require('../models/inscripciones');

const { GraphQLObjectType, GraphQLID, GraphQLString,  GraphQLFloat, GraphQLList, GraphQLSchema} = graphql;


//Esquema de usuarios, definimos los datos y tipo de datos

const UsuarioType = new GraphQLObjectType({ 

    name: 'Usuario',
    fields: () => ({
        id: { type: GraphQLString },
        nombres: { type: GraphQLString },
        apellidos : { type: GraphQLString },
        identificacion : { type: GraphQLString },
        correo : { type: GraphQLString },
        clave: { type: GraphQLString },
        rol: { type: GraphQLString },
        estado: { type: GraphQLString },

    })


});

//Esquema de proyectos, definicion de datos y tipo de datos

const ProyectoType = new GraphQLObjectType({ 

    name: 'Proyecto',
    fields: () => ({
        id: { type: GraphQLString },
        nombre: { type: GraphQLString },
        presupuesto: { type: GraphQLFloat },
        fechaInicio: { type: GraphQLString },
        fechaFin: { type: GraphQLString },
        objGeneral: { type: GraphQLString },
        objEspecificos: { type: GraphQLList(GraphQLString) },
        idLider: { 
            type: UsuarioType,
            resolve(parent, args){
                return Usuario.findById(parent.idLider);
            },
        },
        estadoProyecto: { type: GraphQLString },
        fase: { type: GraphQLString }

    })

});

//Esquema de Avance, definicion de datos y tipo de datos

const AvanceType = new GraphQLObjectType({ 

    name: 'Avance',
    fields: () => ({
        id: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        fecha_avance : { type: GraphQLString },
        idProyecto : { 
            type: ProyectoType,
            resolve(parent, args){
                return Proyecto.findById(parent.idProyecto);
            }
             },
        observaciones: { type: GraphQLList(GraphQLString) }
    })


});

//Esquema de Inscripcion, definicion de datos y tipo de datos

const InscripcionType = new GraphQLObjectType({ 

    name: 'Inscripcion',
    fields: () => ({
        id: { type: GraphQLString },
        estadoInscripcion: { type: GraphQLString },
        fechaIngreso : { type: GraphQLString },
        idProyecto : { 
            type: ProyectoType,
            resolve(parent, args){
                return Proyecto.findById(parent.idProyecto);
            }
             },
        idEstudiante : { 
            type: UsuarioType,
            resolve(parent, args){
                return Usuario.findById(parent.idEstudiante);
                 }
            }
    })


});


//Esquema de consultas 

const RootQuery = new GraphQLObjectType({  
    name: 'RootQueryType',
    fields: {
        usuario: {  //consulta de usuario por ID
            type: UsuarioType,
            args: {  //consultamos el usuario con base a su id (sí, el id ese largo que Mongo crea automáticamente)
                id: { 
                type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Usuario.findById(args.id);
            }
        },
        usuarios: { //consulta de todos los usuarios
            type: new GraphQLList(UsuarioType),
            resolve(parent, args) {
                return Usuario.find({});
            }
        },
        proyecto:{  //consulta de proyecto por ID
            type: ProyectoType,
            args: {
                id: { //consultamos el proyecto con base a su id
                    type: GraphQLString
                }
            },
            resolve(parent, args) { //devolvemos la informacion del proyecto
                return Proyecto.findById(args.id);
            }   
        },
        proyectos:{ //consulta de todos los proyectos
            type: new GraphQLList(ProyectoType),
            resolve(parent, args) {
                return Proyecto.find({});
            }
        },
        avances: { //consulta de todos los avances
            type: new GraphQLList(AvanceType),
            resolve(parent, args) {
                return Avances.find({});
            }
        },
        avance:{  //consulta de avance por ID
            type: AvanceType,
            args: {
                id: { //consultamos el avance de acuerdo al id
                    type: GraphQLString
                }
            },
            resolve(parent, args) { //devolvemos la informacion del proyecto
                return Avances.findById(args.id);
            }   
        },
        inscripciones: { //consulta de todos las inscripciones
            type: new GraphQLList(InscripcionType),
            resolve(parent, args) {
                return Inscripciones.find({});
            }
        },
        inscripcion:{  //consulta de inscripcion por ID
            type: InscripcionType,
            args: {
                id: { //consultamos el avance de acuerdo al id
                    type: GraphQLString
                }
            },
            resolve(parent, args) { //devolvemos la informacion del proyecto
                return Inscripciones.findById(args.id);
            }   
        }

    }
     
        
});

//Mutations (operaciones para agregar, eliminar, modificar)

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        agregarUsuario:{ //agregar usuario
            type: UsuarioType,
            args: {
                nombres: { type: GraphQLString },
                apellidos: { type: GraphQLString },
                identificacion: { type: GraphQLString },
                correo: { type: GraphQLString },
                clave: { type: GraphQLString },
                rol: { type: GraphQLString },
                estado: { type: GraphQLString }
            },
            resolve(parent, args) {

                const usuario = new Usuario({
                    nombres: args.nombres,
                    apellidos: args.apellidos,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    clave: args.clave,
                    rol: args.rol,
                    estado: args.estado
                });

                return usuario.save();
                

            }
        }, 
        modificarUsuario:{ //modificar usuario
            type: UsuarioType,
            args: {
                id: { type: GraphQLString },
                nombres: { type: GraphQLString },
                apellidos: { type: GraphQLString },
                identificacion: { type: GraphQLString },
                correo: { type: GraphQLString },
                clave: { type: GraphQLString },
                rol: { type: GraphQLString },
                estado: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Usuario.findByIdAndUpdate(args.id, {
                    nombres: args.nombres,
                    apellidos: args.apellidos,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    clave: args.clave,
                    rol: args.rol,
                    estado: args.estado
                });
            }
        },
        eliminarUsuario:{ //eliminar usuario
            type: UsuarioType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Usuario.findByIdAndRemove(args.id);
            }
        },

        agregarProyecto:{ //agregar proyecto
            type: ProyectoType,
            args: {
                nombre: { type: GraphQLString },
                presupuesto: { type: GraphQLFloat },
                fechaInicio: { type: GraphQLString },
                fechaFin: { type: GraphQLString },
                objGeneral: { type: GraphQLString },
                objEspecificos: { type: GraphQLList(GraphQLString) },
                idLider: { type: GraphQLID },
                estadoProyecto: { type: GraphQLString },
                fase: { type: GraphQLString }
            },
            resolve(parent, args) {
                const proyecto = new Proyecto({
                    nombre: args.nombre,
                    presupuesto: args.presupuesto,
                    fechaInicio: args.fechaInicio,
                    fechaFin: args.fechaFin,
                    objGeneral: args.objGeneral,
                    objEspecificos: args.objEspecificos,
                    idLider: args.idLider,
                    estadoProyecto: args.estadoProyecto,
                    fase: args.fase
                });

                return proyecto.save();
            }
        },
        modificarProyecto:{ //modificar proyecto
            type: ProyectoType,
            args: {
                id: { type: GraphQLString },
                nombre: { type: GraphQLString },
                presupuesto: { type: GraphQLFloat },
                fechaInicio: { type: GraphQLString },
                fechaFin: { type: GraphQLString },
                objGeneral: { type: GraphQLString },
                objEspecificos: { type: GraphQLList(GraphQLString) },
                idLider: { type: GraphQLID },
                estadoProyecto: { type: GraphQLString },
                fase: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Proyecto.findByIdAndUpdate(args.id, {
                    nombre: args.nombre,
                    presupuesto: args.presupuesto,
                    fechaInicio: args.fechaInicio,
                    fechaFin: args.fechaFin,
                    objGeneral: args.objGeneral,
                    objEspecificos: args.objEspecificos,
                    idLider: args.idLider,
                    estadoProyecto: args.estadoProyecto,
                    fase: args.fase
                });
            }
        },
        eliminarProyecto:{ //eliminar proyecto
            type: ProyectoType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Proyecto.findByIdAndRemove(args.id);
            }
        },

        agregarAvance:{ //agregar Avance
            type: AvanceType,
            args: {
                descripcion: { type: GraphQLString },
                fecha_avance: { type: GraphQLString },
                observaciones: { type: GraphQLList(GraphQLString) },
                idProyecto: { type: GraphQLID }
            },
            resolve(parent, args) {
                const avance = new Avances({
                    descripcion: args.descripcion,
                    fecha_avance: args.fecha_avance,
                    observaciones: args.observaciones,
                    idProyecto: args.idProyecto
                });

                return avance.save();
            }
        },
        modificarAvance:{ //modificar Avance
            type: AvanceType,
            args: {
                id: { type: GraphQLString },
                descripcion: { type: GraphQLString },
                fecha_avance: { type: GraphQLString },
                observaciones: { type: GraphQLList(GraphQLString) },
                idProyecto: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Avances.findByIdAndUpdate(args.id, {
                    descripcion: args.descripcion,
                    fecha_avance: args.fecha_avance,
                    observaciones: args.observaciones,
                    idProyecto: args.idProyecto
                });
            }
        },
        eliminarAvance:{ //eliminar Avance
            type: AvanceType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Avances.findByIdAndRemove(args.id);
            }
        },

        agregarInscripcion:{ //agregar INSCRIPCION
            type: InscripcionType,
            args: {
                estadoInscripcion: { type: GraphQLString },
                fechaIngreso: { type: GraphQLString },
                idEstudiante: { type: GraphQLID },
                idProyecto: { type: GraphQLID }
            },
            resolve(parent, args) {
                const inscripcion = new Inscripciones({
                    estadoInscripcion: args.estadoInscripcion,
                    fechaIngreso: args.fechaIngreso,
                    idEstudiante: args.idEstudiante,
                    idProyecto: args.idProyecto
                });

                return inscripcion.save();
            }
        },
        modificarInscripcion:{ //modificar Inscripcion
            type: InscripcionType,
            args: {
                id: { type: GraphQLString },
                estadoInscripcion: { type: GraphQLString },
                fechaIngreso: { type: GraphQLString },
                idEstudiante: { type: GraphQLID },
                idProyecto: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Inscripciones.findByIdAndUpdate(args.id, {
                    estadoInscripcion: args.estadoInscripcion,
                    fechaIngreso: args.fechaIngreso,
                    idEstudiante: args.idEstudiante,
                    idProyecto: args.idProyecto
                });
            }
        },
        eliminarInscripcion:{ //eliminar Inscripcion
            type: InscripcionType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Inscripciones.findByIdAndRemove(args.id);
            }
        }
    }   
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });

