const Proyecto = require('../modelos/proyectos.modelos');

exports.insertOne = (req, res) => {
    Proyecto.insertOne(new Proyecto(req.body),
        (error, proyecto) => {
            if (error){
                res.send({mensaje: "No se agrego el proyecto"})
            }
            else {
                res.send(proyecto);
            }
        }
    );
}