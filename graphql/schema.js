const graphql = require('graphql');
const Usuario = require('../models/usuario');
const Proyecto = require('../models/proyecto');
//const Avances = require('../models/avances');
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
    }   
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });

