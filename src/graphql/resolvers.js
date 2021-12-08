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
            if(context.user.auth  && context.user.rol === 'Administrador'){
                return Usuario.find();
            }else{
                throw new Error('No estas autorizado');
            } 
        },
        Proyectos: (_, args, context) => { //Todos los proyectos
            if(context.user.auth) {
                return Proyecto.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        ProyectosPorLider: (_, args, context) => {  //Ver los proyectos de un lider
            if(context.user.auth && context.user.rol === 'Lider') {
                return Proyecto.find({idLider: args.id});
            }else{
                throw new Error('No estas autorizado');
            }
        },

        Inscripciones: (_, args, context) => {  //Todas las inscripciones
            if(context.user.auth && context.user.rol === 'Lider') {
                return Inscripcion.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        Avances: (_, args, context) => {   //Todos los avances
            if(context.user.auth && context.user.rol === 'Estudiante' || context.user.rol === 'Lider') {
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
                const token = await generarJWT(usuario.id, usuario.rol);
                return token;
                
            }else{
                return "Usuario o contraseña incorrectos";
            }
   

        }
            

    },
    Mutation: {
        async agregarUsuario( _, { usuario }, context) {   //Este es el registro de nuevo usuario

            if(context.user.auth) {
                
                const nusuario = new Usuario({
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    identificacion: usuario.identificacion,
                    correo: usuario.correo,
                    clave: bycript.hashSync(usuario.clave, salt),
                    rol: usuario.rol,
                    estado: "Pendiente"
                });
    
                return await nusuario.save();
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async aprobarUsuario( _, { id}, context) {   //Administrador aprueba un usuario nuevo

            if(context.user.auth && context.user.rol === 'Administrador') {
                return await Usuario.findByIdAndUpdate(id, {
                    estado: "Autorizado"
                });
            }else{
                throw new Error('No estas autorizado');
            }

            
        },

        async actualizarUsuario( _, { id, usuario }, context) {   //Usuario(de cualquier rol) modifica sus propios datos

            if(context.user.auth) {

                return await Usuario.findByIdAndUpdate(id, {
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    identificacion: usuario.identificacion,
                    correo: usuario.correo,
                    clave: bycript.hashSync(usuario.clave, salt)
                });
            }else{
                throw new Error('No estas autorizado');
            }

        },
        
        async eliminarUsuario( _, { id }, context) {

            if(context.user.auth && context.user.rol === 'Administrador') {
                return await Usuario.findByIdAndDelete(id);
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async agregarProyecto( _, { proyecto }, context) {  //Lider agrega un nuevo proyecto

            if(context.user.auth && context.user.rol === 'Lider') {

                const nproyecto = new Proyecto({
                    nombre: proyecto.nombre,
                    presupuesto: proyecto.presupuesto,
                    fechaInicio: "",
                    fechaFin: "",
                    objGeneral: proyecto.objGeneral,
                    objEspecificos: proyecto.objEspecifico,
                    idLider: proyecto.idLider,
                    estadoProyecto: "Inactivo",
                    fase: "",
                    avances: []
                });
    
                return await nproyecto.save();
            }else{
                throw new Error('No estas autorizado');
            }


          
        },


        async aprobarProyecto( _, {id}, context) {

            if(context.user.auth && context.user.rol === 'Administrador') { //Administrador aprueba un proyecto

                return await Proyecto.findByIdAndUpdate(id, {
                    fechaInicio: hoy.toLocaleString(),
                    estadoProyecto: "Activo",
                    fase: "Inicio"
                })
            }else{
                throw new Error('No estas autorizado');
            }

        },

        async terminarProyecto( _, { id }, context) {   //Administrador termina un proyecto

            if(context.user.auth && context.user.rol === 'Administrador') {
                    
                return await Proyecto.findByIdAndUpdate(id, {
                    fechaFin: hoy.toLocaleDateString(),
                    estadoProyecto: "Inactivo",
                    fase: "Terminado"
                });

            }else{
                throw new Error('No estas autorizado');
            }

        },


        async actualizarProyecto( _, { id, proyecto }, context) {  //Lider modifica un proyecto

            if(context.user.auth && context.user.rol === 'Lider') {
                return await Proyecto.findByIdAndUpdate(id, {
                    nombre: proyecto.nombre,
                    presupuesto: proyecto.presupuesto,
                    objGeneral: proyecto.objGeneral,
                    objEspecificos: proyecto.objEspecificos
                })
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async eliminarProyecto( _, { id }, context) {
                
                if(context.user.auth && context.user.rol === 'Lider') { //Lider elimina un proyecto
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

        async aprobarInscripcion( _, {id}, context) { //Lider aprueba inscripción 

            if(context.user.auth && context.user.rol === 'Lider') {
                return await Inscripcion.findByIdAndUpdate(id, {
                    estadoInscripcion: "Aprobado",
                    fechaIngreso: hoy.toLocaleString()
                })
            }else{
                throw new Error('No estas autorizado');
            }

        },   

        async eliminarInscripcion( _, { id }, context) {  //Lider elimina una inscripción

            if(context.user.auth && context.user.rol === 'Lider') {
                return await Inscripcion.findByIdAndDelete(id);
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async agregarAvance( _, { idProyecto, descripcion }, context) {  //Estudiante agrega un avance

            if(context.user.auth && context.user.rol === 'Estudiante') {
                const navance = new Avance({
                    descripcion: descripcion,
                    fecha_avance: hoy.toLocaleString(),
                    idProyecto: idProyecto,
                    observaciones: []
                });

                let { _id } = await navance.save(); //Guarda el avance y a la vez obtiene el id con el que quedó en la bd

                if(_id){

                    let { avances } = await Proyecto.findById(idProyecto); //Obtiene los avances actuales del proyecto

                    let nuevosAvances = [...avances, _id]; //Agrega el nuevo avance al arreglo de avances

                    return await Proyecto.findByIdAndUpdate(
                        idProyecto,
                        { avances: nuevosAvances },
                        { new: true }
                    ).populate("avances");
                }

            }else{
                throw new Error('No estas autorizado');
            }

            
        },

        async actualizarAvance( _, { id, descripcion }, context) {   //Estudiante actualiza un avance

            if(context.user.auth && context.user.rol === 'Estudiante') {
                return await Avance.findByIdAndUpdate(id, {
                    descripcion: descripcion
                })
            }else{
                throw new Error('No estas autorizado');
            }
            
        },

        async eliminarAvance( _, { id }){  //Estudiante elimina un avance
            if(context.user.auth && context.user.rol === 'Estudiante') {

                Avance.findByIdAndDelete(id);

                let { avances } = await Proyecto.findById(id); //Obtiene los avances actuales del proyecto

                let nuevosAvances = avances.filter(avance => avance.toString() !== id); //Elimina el avance del arreglo de avances

                return await Proyecto.findByIdAndUpdate(
                    id,
                    { avances: nuevosAvances },
                    { new: true }
                ).populate("avances");
    
            }else{
                throw new Error('No estas autorizado');
            }
        },

        async agregarObservacion( _, { idAvance, observacion }, context) {  //Lider agrega una observación

            if(context.user.auth && context.user.rol === 'Lider') {

                let { observaciones } = await Avance.findById(idAvance); //Buscamos el avance
                let nuevaObservacion={  //Creamos un objeto con la nueva observación
                  observacion:observacion,
                  fechaObservacion: hoy.toLocaleString()
                }
               let listaObservaciones = [...observaciones, nuevaObservacion]; //Agregamos la nueva observación a un arreglo de observaciones
               return await Avance.findByIdAndUpdate(
                  idAvance,
                 { observaciones: listaObservaciones },
                 { new: true }
               );


            }else{
                throw new Error('No estas autorizado');
            }
            
        }
    }

};
    