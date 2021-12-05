import Usuario from '../models/usuario';
import Proyecto from '../models/Proyecto';
import Inscripcion from '../models/Inscripcion';
import Avance from '../models/Avance';

import bycript from 'bcrypt';
import { generarJWT } from '../helpers/jwt';

//Para calcular la fecha actual
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

//Para encriptar contraseña
const salt =  bycript.genSaltSync();

export const resolvers = {

    Query: {
        Usuarios: (_, args, context) => {  //Context sirve para inyectar info desde una query a otra, en este caso se usa para validar el token
            if(context.user.auth) {
                return Usuario.find();
            }else{
                throw new Error('No estas autorizado');
            } 
        },
        Proyectos: (_, args, context) => {
            if(context.user.auth) {
                return Proyecto.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        Inscripciones: (_, args, context) => {
            if(context.user.auth) {
                return Inscripcion.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        Avances: (_, args, context) => {
            if(context.user.auth) {
                return Avance.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        Login: async (_, { correo, clave}) => {

            const usuario = await Usuario.findOne({ correo });

            if (!usuario) {
                return "Usuario o contraseña incorrectos";
            }

            const valido = bycript.compareSync(clave, usuario.clave); //comparando con la contraseña encriptada

            if (valido) {
                const token = await generarJWT(usuario.id, usuario.nombre);
                return token;
                
            }else{
                return "Usuario o contraseña incorrectos";
            }
   

        }
            

    },
    Mutation: {
        async agregarUsuario( _, { usuario }, context) {

            if(context.user.auth) {
                const nusuario = new Usuario({
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    identificacion: usuario.identificacion,
                    correo: usuario.correo,
                    clave: bycript.hashSync(usuario.clave, salt),
                    rol: usuario.rol,
                    estado: "Inactivo"
                });
    
                return await nusuario.save();
            }else{
                throw new Error('No estas autorizado');
            }
            
        },
        async actualizarUsuario( _, { id, usuario }, context) {

            if(context.user.auth) {

                return await Usuario.findByIdAndUpdate(id, {
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    identificacion: usuario.identificacion,
                    correo: usuario.correo,
                    clave: bycript.hashSync(usuario.clave, salt),
                    rol: usuario.rol
                });
            }else{
                throw new Error('No estas autorizado');
            }

        },
        async actualizarEstadoUsuario( _, { id, estado }, context) {

            if(context.user.auth) {
                return await Usuario.findByIdAndUpdate(id, {
                    estado: estado
                });
            }else{
                throw new Error('No estas autorizado');
            }

            
        },

        async eliminarUsuario( _, { id }, context) {

            if(context.user.auth) {
                return await Usuario.findByIdAndDelete(id);
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async agregarProyecto( _, { proyecto }, context) {

            if(context.user.auth) {

                const nproyecto = new Proyecto({
                    nombre: proyecto.nombre,
                    presupuesto: proyecto.presupuesto,
                    fechaInicio: "",
                    fechaFin: "",
                    objGeneral: proyecto.objGeneral,
                    objEspecificos: proyecto.objEspecifico,
                    idLider: proyecto.idLider,
                    estadoProyecto: "Inactivo",
                    fase: ""
                });
    
                return await nproyecto.save();
            }else{
                throw new Error('No estas autorizado');
            }


          
        },

        async terminarProyecto( _, { id }, context) {

            if(context.user.auth) {
                    
                return await Proyecto.findByIdAndUpdate(id, {
                    fechaFin: hoy.toLocaleDateString(),
                    estadoProyecto: "Terminado"
                });

            }else{
                throw new Error('No estas autorizado');
            }

        },

        async aprobarProyecto( _, {id}, context) {

            if(context.user.auth) {

                return await Proyecto.findByIdAndUpdate(id, {
                    fechaInicio: hoy.toLocaleString(),
                    estadoProyecto: "Activo",
                    fase: "Inicio"
                })
            }else{
                throw new Error('No estas autorizado');
            }

        },

        async actualizarProyecto( _, { id, proyecto }, context) {

            if(context.user.auth) {
                return await Proyecto.findByIdAndUpdate(id, {
                    nombre: proyecto.nombre,
                    presupuesto: proyecto.presupuesto,
                    objGeneral: proyecto.objGeneral,
                    objEspecificos: proyecto.objEspecifico,
                    idLider: proyecto.idLider,
                })
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async eliminarProyecto( _, { id }, context) {
                
                if(context.user.auth) {
                    return await Proyecto.findByIdAndDelete(id);
                }else{
                    throw new Error('No estas autorizado');
                }
                
        },

        async agregarInscripcion( _, { inscripcion }, context) {

            if(context.user.auth) {
                const ninscripcion = new Inscripcion({
                    estadoInscripcion: "En proceso",
                    fechaIngreso: "",
                    idProyecto: inscripcion.idProyecto,
                    idEstudiante: inscripcion.idEstudiante
                });
    
                return await ninscripcion.save();
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async aprobarInscripcion( _, {id}, context) {

            if(context.user.auth) {
                return await Inscripcion.findByIdAndUpdate(id, {
                    estadoInscripcion: "Aprobado",
                    fechaIngreso: hoy.toLocaleString()
                })
            }else{
                throw new Error('No estas autorizado');
            }

        },   

        async eliminarInscripcion( _, { id }, context) {

            if(context.user.auth) {
                return await Inscripcion.findByIdAndDelete(id);
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async agregarAvance( _, { avance }, context) {

            if(context.user.auth) {
                const navance = new Avance({
                    descripcion: avance.descripcion,
                    fecha_avance: hoy.toLocaleString(),
                    idProyecto: avance.idProyecto,
                    observaciones: []
                });
    
                return await navance.save();
            }else{
                throw new Error('No estas autorizado');
            }

            
        },

        async actualizarAvance( _, { id, descripcion }, context) {

            if(context.user.auth) {
                return await Avance.findByIdAndUpdate(id, {
                    descripcion: descripcion
                })
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async agregarObservacion( _, { id, observacion }, context) {

            if(context.user.auth) {
                return await Avance.findByIdAndUpdate(id, {
                    observaciones: [observacion]
                })
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async eliminarAvance( _, { id }){
            if(context.user.auth) {
                return await Avance.findByIdAndDelete(id);
            }else{
                throw new Error('No estas autorizado');
            }
        }


    }

};
    