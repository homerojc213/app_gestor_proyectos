module.exports = (app) => {
    const proyecto = require('../controladores/proyectos.controlador');
    app.post("/proyectos", proyecto.insertOne);
}