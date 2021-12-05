import Usuario from '../models/usuario';
import Proyecto from '../models/Proyecto';
import Inscripcion from '../models/Inscripcion';


//Para calcular la fecha actual
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

export const resolvers = {

    Query: {
        Usuarios: () => {
            return Usuario.find();
        },
        Proyectos: () => {
            return Proyecto.find();
        },
        Inscripciones: () => {
            return Inscripcion.find();
        }

    },
    Mutation: {
        async agregarUsuario( _, { usuario }){
            const nusuario = new Usuario({
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                identificacion: usuario.identificacion,
                correo: usuario.correo,
                clave: usuario.clave,
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
                clave: usuario.clave,
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
        }

        
    }


};
    