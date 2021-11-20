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
};

exports.findOne = (req,res) => {
    Proyecto.findOne(req.params.idProyecto,
        (error, proyecto) => {
            if(error){
                res.send({mensaje: "No se encontro el proyecto"})
            }
            else {
                res.send(proyecto);
            }
        }
    );
};

exports.findAll = (req,res) => {
    Proyecto.findAll(
        (error, proyectos) => {
            if(error){
                res.send({mensaje: "No se encontro la lista de proyectos"})
            }
            else {
                res.send(proyectos);
            }
        }
    );
};

exports.updateOne = (req, res) => {
    Proyecto.updateOne(req.params.idProyecto, new Proyecto(req.body),
        (error, proyecto) => {
            if(error){
                res.send({mensaje: "No se actualizo el proyecto"})
            }
            else {
                res.send({mensaje: `El proyecto con id = ${req.params.idProyecto} fue actualizado con exito`});
            }
        }
    );
};

exports.deleteOne = (req, res) => {
    Proyecto.deleteOne(req.params.idProyecto,
        (error, proyecto) => {
            if(error){
                res.send({mensaje: "No se borro el proyecto"})
            }
            else {
                res.send({mensaje: `El proyecto con id = ${req.params.idProyecto} fue borrado con exito`});
            }
        }
    );
}