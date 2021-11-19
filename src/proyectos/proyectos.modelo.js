import React, { useState } from "react";
import insertOne from '../mongo/script';

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
        estadoProeycto: "",
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
        console.log(proyectos);
        setProyectos({
            ...proyectos,[e.target.name]: proyecto[e.target.name]
        });
        
    }
    const guardarProyecto = () => {
        insertOne(proyectos,'Proyectos');
        proyecto = {
            idProyecto: "",
            nombreProyecto: "",
            objetivoGeneral: "",
            objetivosEspecificos: [],
            presupuesto: 0,
            fechaInicio: "",
            fechaFin: "",
            identificacionLider: "",
            nombreLider: "",
            estadoProeycto: "",
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
                    required
                />
                <br /><br />

                <label>Nombre:</label>
                <input
                    name="nombreProyecto"
                    value={proyectos.nombreProyecto}
                    type="text"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>Objetivo general:</label>
                <input
                    name="objetivoGeneral"
                    value={proyectos.objetivoGeneral}
                    type="text"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>Objetivo especificos:</label>
                <input
                    name="objetivosEspecificos"
                    value={proyectos.objetivosEspecificos}
                    type="text"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>Presupuesto:</label>
                <input
                    name="presupuesto"
                    value={proyectos.presupuesto}
                    type="number"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>Fecha de inicio:</label>
                <input
                    name="fechaInicio"
                    value={proyectos.fechaInicio}
                    type="date"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>Fecha de finalizacion:</label>
                <input
                    name="fechaFin"
                    value={proyectos.fechaFin}
                    type="date"
                    onChange={handleChange}
                    required
                    />
                <br /><br />

                <label>N de identificacion del lider:</label>
                <input
                    name="identificacionLider"
                    value={proyectos.identificacionLider}
                    type="number"
                    onChange={handleChange} 
                    required
                    />
                <br /><br />

                <label>Nombre del lider:</label>
                <input
                    name="nombreLider"
                    value={proyectos.nombreLider}
                    type="text"
                    onChange={handleChange} 
                    required
                    />
                <br /><br />

                <label>Estado:</label>
                <input
                    name="estado"
                    value={proyectos.estadoProyecto}
                    onChange={handleChange}
                    type="text"
                />
                <br /><br />

                <label>Fase:</label>
                <input
                    name="fase"
                    value={proyectos.fase}
                    onChange={handleChange}
                    type="text"
                    required
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