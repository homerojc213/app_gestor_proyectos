import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AUTH_TOKEN } from '../constants';
import { GET_PROYECTOS_ESTUDIANTE } from '../Apollo/gql/getProyectosEstudiante';


export const MisProyectosEstudiante = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const idEstudiante = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";


    const [proyectos, setProyectos] = useState([]);

    const { loading, error, data:listaProyectos } = useQuery(GET_PROYECTOS_ESTUDIANTE, {
        variables: { id: idEstudiante },
    });

    useEffect(() => {
        if (listaProyectos) {
            setProyectos(listaProyectos.ProyectosPorEstudiante);
        }
    } , [listaProyectos]);

    let proyectosPendientes = proyectos.filter(proyecto => proyecto.estadoProyecto === "En proceso");
    let proyectosAceptados = proyectos.filter(proyecto => proyecto.estadoProyecto === "Aprobado");



    return (
        <>
            <Navigation />
            <div className="container text-center">
                <h2>Mis Proyectos</h2>
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los proyectos</p>}

                <h3 className="mt-4">Proyectos pendientes</h3>

                {proyectosPendientes.length === 0  && <p>No tienes proyectos pendientes</p>}

                {proyectosPendientes.length > 0 &&
                    <ul class="list-group">
                        {proyectosPendientes.map(proyecto => (
                            <li class="list-group-item list-group-item-primary" key={proyecto.id}>
                                <p>Proyecto: {proyecto.idProyecto.nombre}</p>
                            </li>
                        ))}
                    </ul>
                }

                <h3 className="mt-4">Proyectos aceptados</h3>

                {proyectosAceptados.length === 0  && <p>No tienes Proyectos aceptados</p>}

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