import { useState } from "react";

const insertOne = (proyecto) => {
    fetch("http://localhost:3010/proyectos", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idProyecto: proyecto.idProyecto,
            nombreProyecto: proyecto.nombreProyecto,
            objetivoGeneral: proyecto.objetivoGeneral,
            objetivosEspecificos: proyecto.objetivosEspecificos,
            presupuesto: proyecto.presupuesto,
            fechaInicio: proyecto.fechaInicio,
            fechaFin: proyecto.fechaFin,
            identificacionLider: proyecto.identificacionLider,
            nombreLider: proyecto.nombreLider,
            estadoProyecto: proyecto.estadoProyecto,
            fase: proyecto.fase
        })
    })
        .then(
            res => res.json()
        )
}

const Proyectos = () => {

    let proyecto = {
        idProyecto: "",
        nombreProyecto: "",
        objetivoGeneral: "",
        objetivosEspecificos: "",
        presupuesto: "",
        fechaInicio: "",
        fechaFin: "",
        identificacionLider: "",
        nombreLider: "",
        estadoProyecto: "",
        fase: ""
    }
    const [proyectos, setProyectos] = useState({
        idProyecto: "",
        nombreProyecto: "",
        objetivoGeneral: "",
        objetivosEspecificos: "",
        presupuesto: "",
        fechaInicio: "",
        fechaFin: "",
        identificacionLider: "",
        nombreLider: "",
        estadoProyecto: "",
        fase: ""
    });

    const handleChange = (e) => {
        // proyecto = {[e.target.name]: (proyecto[e.target.name]  + e.target.value) }

        proyecto[e.target.name] += e.target.value;
        
        setProyectos({
            ...proyectos, [e.target.name]: proyecto[e.target.name]
        });
        console.log(proyectos);
    }
    const guardarProyecto = () => {
        insertOne(proyectos);
        proyecto = {
            idProyecto: "",
            nombreProyecto: "",
            objetivoGeneral: "",
            objetivosEspecificos: [],
            presupuesto: "",
            fechaInicio: "",
            fechaFin: "",
            identificacionLider: "",
            nombreLider: "",
            estadoProyecto: "",
            fase: ""
        }
        setProyectos(proyecto);
    }

    return (
        <>
            <h1>Ingresar nuevo proyecto:</h1>
            <form>
                <label>Id:</label>
                <input
                    name="idProyecto"
                    value={proyectos.idProyecto}
                    type="number"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Nombre:</label>
                <input
                    name="nombreProyecto"
                    value={proyectos.nombreProyecto}
                    type="text"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Objetivo general:</label>
                <input
                    name="objetivoGeneral"
                    value={proyectos.objetivoGeneral}
                    type="text"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Objetivo especificos:</label>
                <input
                    name="objetivosEspecificos"
                    value={proyectos.objetivosEspecificos}
                    type="text"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Presupuesto:</label>
                <input
                    name="presupuesto"
                    value={proyectos.presupuesto}
                    type="number"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Fecha de inicio:</label>
                <input
                    name="fechaInicio"
                    value={proyectos.fechaInicio}
                    type="date"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Fecha de finalizacion:</label>
                <input
                    name="fechaFin"
                    value={proyectos.fechaFin}
                    type="date"
                    onChange={handleChange}

                />
                <br /><br />

                <label>N de identificacion del lider:</label>
                <input
                    name="identificacionLider"
                    value={proyectos.identificacionLider}
                    type="number"
                    onChange={handleChange}

                />
                <br /><br />

                <label>Nombre del lider:</label>
                <input
                    name="nombreLider"
                    value={proyectos.nombreLider}
                    type="text"
                    onChange={handleChange}
                />
                <br /><br />

                <label>Estado:</label>
                <input
                    name="estadoProyecto"
                    value={proyectos.estadoProyecto}
                    type="text"
                    onChange={handleChange}


                />
                <br /><br />

                <label>Fase:</label>
                <input
                    name="fase"
                    value={proyectos.fase}
                    onChange={handleChange}
                    type="text"

                />
                <br /><br />

                <button onClick={guardarProyecto} >
                    Enviar
                </button>
            </form>
            <div>
                <h2>Lista de proyectos:</h2>
            </div>
        </>
    );
}
export default Proyectos;