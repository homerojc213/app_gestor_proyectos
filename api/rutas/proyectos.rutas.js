module.exports = (app) => {
    const proyecto = require('../controladores/proyectos.controlador');
    
    app.post("/proyectos", proyecto.insertOne);
    
    app.get("/proyectos/:idProyecto", proyecto.findOne);

    app.get("/proyectos", proyecto.findAll);

    app.put("/proyectos/:idProyecto", proyecto.updateOne);

    app.delete("/proyectos/:idProyecto", proyecto.deleteOne);
}