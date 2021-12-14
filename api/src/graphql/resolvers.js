import Usuario from '../models/usuario';
import Proyecto from '../models/Proyecto';
import Inscripcion from '../models/Inscripcion';
import Avance from '../models/Avance';

import bycript from 'bcrypt';
import { generarJWT } from '../helpers/jwt';



//Para encriptar contraseña
const salt =  bycript.genSaltSync();

export const resolvers = {

    Query: {
        Usuarios: (_, args, context) => {  //Context sirve para inyectar info desde una query a otra, en este caso se usa para validar el token
            if(context.user.auth && context.user.rol === 'Administrador'){
                return Usuario.find();
            }else{
                throw new Error('No estas autorizado');
            } 
        },

        UsuarioPorId: (_, { id }, context) => {
            if(context.user.auth){
                return Usuario.findById(id);
            }else{
                throw new Error('No estas autorizado');
            }
        },

        Proyectos: async (_, args, context) => { //Todos los proyectos
            if(context.user.auth){
            return await Proyecto.find();
            }else{
                throw new Error('No estas autorizado');
            }
        },
        ProyectosPorLider: (_, args, context) => {  //Ver los proyectos de un lider
            if(context.user.auth && context.user.rol === 'Lider'){
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
        
        AvancesPorProyecto: (_, args, context) => {   //Todos los avances por proyecto
            if(context.user.auth) {
                return Avance.find({idProyecto: args.id});
            }else{
                throw new Error('No estas autorizado');
            }
        }
            
    },
    Mutation: {

        async login (_, { correo, clave }) {
            const usuario = await Usuario.findOne({ correo });

            if (!usuario) {
                return "Usuario o contraseña incorrectos";
            }

            const valido = bycript.compareSync(clave, usuario.clave); //comparando con la contraseña encriptada

            if (!valido) {
                return {
                    error: "Usuario o contraseña incorrectos"
                }
            }


            if(valido && usuario.estado !== 'Autorizado'){
                return {
                    error: "Ups! tu cuenta esta inactiva, contacta con el administrador"
                }
            }else if(valido && usuario.estado === 'Autorizado'){
                return {
                    token: await generarJWT(usuario.id, usuario.nombres, usuario.rol, usuario.estado)
                }
            }
                
            
        },
        
        async agregarUsuario( _, { nombres, apellidos, identificacion, correo, clave, rol }) {

                const nusuario = new Usuario({
                    nombres: nombres,
                    apellidos: apellidos,
                    identificacion: identificacion,
                    correo: correo,
                    clave: bycript.hashSync(clave, salt),
                    rol: rol,
                    estado: "Pendiente"
                });
    
                return await nusuario.save();
            
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

        async actualizarUsuario( _, { id, nombres, apellidos, identificacion, correo, clave}, context) {   //Usuario(de cualquier rol) modifica sus propios datos

            if(context.user.auth) {

                return await Usuario.findByIdAndUpdate(id, {
                    nombres: nombres,
                    apellidos: apellidos,
                    identificacion: identificacion,
                    correo: correo
                });
            }else{
                throw new Error('No estas autorizado');
            }

        },

        async actualizarClave( _, { id, clave}, context) {   //Usuario(de cualquier rol) modifica su propia clave   

            if(context.user.auth) {

                return await Usuario.findByIdAndUpdate(id, {
                    clave: bycript.hashSync(clave, salt)
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

        async agregarProyecto( _, { nombre, presupuesto, objGeneral, objEspecificos, idLider }, context) {

            if(context.user.auth && context.user.rol === 'Lider') {
                const nproyecto = new Proyecto({
                    nombre: nombre,
                    presupuesto: presupuesto,
                    fechaInicio: "",
                    fechaFin: "",
                    objGeneral: objGeneral,
                    objEspecificos: objEspecificos,
                    idLider: idLider,
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

            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);

            if(context.user.auth) { //Administrador aprueba un proyecto
                try {
                    return await Proyecto.findByIdAndUpdate(id, {
                        fechaInicio: hoy.toLocaleString(),
                        estadoProyecto: "Activo",
                        fase: "Inicio"
                    })
                } catch (error) {
                    console.error(error);
                }
                
            }else{
                throw new Error('No estas autorizado');
            }

        },

        async terminarProyecto( _, { id }, context) {   //Administrador termina un proyecto

            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);

            if(context.user.auth && context.user.rol === 'Administrador') {
                    
                return await Proyecto.findByIdAndUpdate(id, {
                    fechaFin: hoy.toLocaleDateString(),
                    estadoProyecto: "Terminado",
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
                
                if(context.user.auth && (context.user.rol === 'Administrador' || context.user.rol === 'Lider') ) { //Lider elimina un proyecto
                    console.log(Proyecto.findByIdAndDelete(id))
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

            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);

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
    