import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AUTH_TOKEN } from '../constants';
import { GET_INSCRIPCIONES_ESTUDIANTE } from '../Apollo/gql/getInscripcionesEstudiante';


export const MisProyectosEstudiante = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const idEstudiante = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";


    const [inscripciones, setInscripciones] = useState([]);

    const { loading, error, data:listaInscripciones } = useQuery(GET_INSCRIPCIONES_ESTUDIANTE, {
        variables: { id: idEstudiante },
    });

    useEffect(() => {
        if (listaInscripciones) {
            setInscripciones(listaInscripciones.InscripcionesPorEstudiante);
        }
    } , [listaInscripciones]);

    
    let proyectosAceptados = inscripciones.filter(inscripcion => inscripcion.estadoInscripcion === "Aprobado");
    console.log(proyectosAceptados);


    return (
        <>
            <Navigation />
            <div className="container text-center">
                <h2>Mis Proyectos</h2>
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los proyectos</p>}


                <h3 className="mt-4">Proyectos en los que te encuentras inscripto</h3>

                {proyectosAceptados.length === 0  && <p>No hay proyectos</p>}

                {proyectosAceptados.length > 0 &&

                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Proyecto</th>
                            <th scope="col">Fecha de inicio de proyecto</th>
                            <th scope="col">Fecha de ingreso</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectosAceptados.map(proyecto => (
                            <tr key={proyecto.id}>
                                <td>{proyecto.idProyecto.nombre}</td>
                                <td>{proyecto.idProyecto.fechaInicio}</td>
                                <td>{proyecto.fechaIngreso}</td>
                                <td>
                                    <button className="btn btn-primary m-1" onClick={() => navigate(`/AvancesProyecto/${proyecto.idProyecto.id}`)}>Ver avances del proyecto</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
        </>
    )
}