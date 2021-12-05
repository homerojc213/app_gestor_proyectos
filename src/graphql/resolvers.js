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
        async agregarUsuario( _, { usuario }){

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
        },
        async actualizarUsuario( _, { id, usuario }){

            return await Usuario.findByIdAndUpdate(id, {
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                identificacion: usuario.identificacion,
                correo: usuario.correo,
                clave: bycript.hashSync(usuario.clave, salt),
                rol: usuario.rol
            });

        },
        async actualizarEstadoUsuario( _, { id, estado }){
            return await Usuario.findByIdAndUpdate(id, {
                estado: estado
            });
        },

        async eliminarUsuario( _, { id }){
            return await Usuario.findByIdAndDelete(id);
        },

        async agregarProyecto( _, { proyecto }){

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
        },

        async terminarProyecto( _, { id }){
            return await Proyecto.findByIdAndUpdate(id, {
                fechaFin: hoy.toLocaleDateString(),
                estadoProyecto: "Terminado"
            });
        },

        async aprobarProyecto( _, {id}){
            return await Proyecto.findByIdAndUpdate(id, {
                fechaInicio: hoy.toLocaleString(),
                estadoProyecto: "Activo",
                fase: "Inicio"
            })
        },

        async actualizarProyecto( _, { id, proyecto }){
            return await Proyecto.findByIdAndUpdate(id, {
                nombre: proyecto.nombre,
                presupuesto: proyecto.presupuesto,
                objGeneral: proyecto.objGeneral,
                objEspecificos: proyecto.objEspecifico,
                idLider: proyecto.idLider,
            })
        },

        async eliminarProyecto( _, { id }){
            return await Proyecto.findByIdAndDelete(id);
        },

        async agregarInscripcion( _, { inscripcion }){
            const ninscripcion = new Inscripcion({
                estadoInscripcion: "En proceso",
                fechaIngreso: "",
                idProyecto: inscripcion.idProyecto,
                idEstudiante: inscripcion.idEstudiante
            });

            return await ninscripcion.save();
        },

        async aprobarInscripcion( _, {id}){
            return await Inscripcion.findByIdAndUpdate(id, {
                fechaIngreso: hoy.toLocaleString(),
                estadoInscripcion: "Aprobada"
            })
        },

        async eliminarInscripcion( _, { id }){
            return await Inscripcion.findByIdAndDelete(id);
        },

        async agregarAvance( _, { avance }){
            const navance = new Avance({
                descripcion: avance.descripcion,
                fecha_avance: hoy.toLocaleString(),
                idProyecto: avance.idProyecto,
                observaciones: []
            });

            return await navance.save();
        },

        async actualizarAvance( _, { id, descripcion }){
            return await Avance.findByIdAndUpdate(id, {
                descripcion: descripcion
            })
        },

        async agregarObservacion( _, { id, observacion }){
            return await Avance.findByIdAndUpdate(id, {
                observaciones: [observacion]
            })
        },

        async eliminarAvance( _, { id }){
            return await Avance.findByIdAndDelete(id);
        }


    }

};
    