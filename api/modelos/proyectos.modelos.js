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

Proyecto.insertOne = async (proyecto, resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const insertOneResult = await collection.insertOne(proyecto);
        console.log(insertOneResult);
        resultado(null, { proyecto });
    } catch (error) {
        console.error(error);
        resultado(error, null);
    }
}

Proyecto.findOne = async (idProyecto, resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const proyectoFind = await collection.find({ idProyecto: parseInt(idProyecto,10) }).toArray();
        console.log(proyectoFind);
        resultado(null, proyectoFind);
    } catch (error) {
        console.error(error);
        resultado(error, null);
    }
}

Proyecto.findAll = async (resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const proyectosFind = await collection.find({}).toArray();
        console.log(proyectosFind);
        resultado(null, proyectosFind);
    } catch (error) {
        console.error(error);
        resultado(error, null);
    }
}

Proyecto.updateOne = async (idProyecto, proyecto, resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const proyectoUpdate = await collection.updateOne({ idProyecto: parseInt(idProyecto,10) }, {$set: proyecto});
        console.log(proyectoUpdate);
        resultado(null, proyectoUpdate);
    } catch (error) {
        console.error(error);
        resultado(error, null);
    }
}

Proyecto.deleteOne = async (idProyecto, resultado) => {
    try {
        const collection = client.db("App_Gestor_Proyectos").collection(`Proyectos`);
        const proyectoDelete = await collection.deleteOne({idProyecto: parseInt(idProyecto,10)});
        console.log(proyectoDelete);
        resultado(null, proyectoDelete);
    } catch (error) {
        console.error(error);
        resultado(error, null);
    }
}


module.exports = Proyecto;