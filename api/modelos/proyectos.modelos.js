const mongo = require('../config/conexion');
const client = require('../config/conexion');
const Proyecto = function (proyecto) {
    this.idProyecto = proyecto.idProyecto;
    this.nombreProyecto = proyecto.nombreProyecto;
    this.objetivoGeneral = proyecto.objetivoGeneral;
    this.objetivosEspecificos = proyecto.objetivosEspecificos;
    this.presupuesto = proyecto.presupuesto;
    this.fechaInicio = proyecto.fechaFin;
    this.fechaFin = proyecto.fechaFin;
    this.identificacionLider = proyecto.identificacionLider;
    this.nombreLider = proyecto.nombreLider;
    this.estadoProyecto = proyecto.estadoProyecto;
    this.fase = proyecto.fase;
}

Proyecto.insertOne = async (proyecto,resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const insertOneResult = await collection.insertOne(proyecto);
        console.log(insertOneResult);
        resultado(null, {proyecto});
    } catch (error) {
        console.error(error);
        resultado(error, null);
    } 
}


module.exports = Proyecto;