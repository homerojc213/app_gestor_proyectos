import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Navigation } from './Navigation';
import { AUTH_TOKEN } from '../constants';
import { GET_INSCRIPCIONES_ESTUDIANTE } from '../Apollo/gql/getInscripcionesEstudiante';


export const MisInscripciones = () => {

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

    let inscripcionesPendientes = inscripciones.filter(inscripcion => inscripcion.estadoInscripcion === "En proceso");
    let inscripcionesAceptadas = inscripciones.filter(inscripcion => inscripcion.estadoInscripcion === "Aprobado");



    return (
        <>
            <Navigation />
            <div className="container text-center">
                <h2>Mis inscripciones</h2>
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar las inscripciones</p>}

                <h3 class="mt-4">Inscripciones pendientes</h3>

                {inscripcionesPendientes.length === 0  && <p>No tienes inscripciones pendientes</p>}

                {inscripcionesPendientes.length > 0 &&
                    <ul class="list-group">
                        {inscripcionesPendientes.map(inscripcion => (
                            <li class="list-group-item list-group-item-primary" key={inscripcion.id}>
                                <p>Proyecto: {inscripcion.idProyecto.nombre}</p>
                            </li>
                        ))}
                    </ul>
                }

                <h3 class="mt-4">Inscripciones aceptadas</h3>

                {inscripcionesAceptadas.length === 0  && <p>No tienes inscripciones aceptadas</p>}

                {inscripcionesAceptadas.length > 0 &&

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Proyecto</th>
                            <th scope="col">Fecha de inicio de proyecto</th>
                            <th scope="col">Fecha de ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inscripcionesAceptadas.map(inscripcion => (
                            <tr key={inscripcion.id}>
                                <td>{inscripcion.idProyecto.nombre}</td>
                                <td>{inscripcion.idProyecto.fechaInicio}</td>
                                <td>{inscripcion.fechaInscripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
        </>
    )
}
