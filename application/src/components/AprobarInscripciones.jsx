import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider'
import GET_INSCRIPCIONES from '../Apollo/gql/getInscripciones';
import { APROBARINSCRIPCION } from '../Apollo/gql/aprobarInscripcion';
import { ELIMINARINSCRIPCION } from '../Apollo/gql/eliminarInscripcion';

import swal from 'sweetalert';


import { Navigation } from './Navigation';
import { AUTH_TOKEN } from '../constants';


export const AprobarInscripciones = () => {

    const authToken = localStorage.getItem(AUTH_TOKEN);

    let idLider = "";

    if(authToken) {
         idLider = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";
    }

    const  { data:misProyectos } = useQuery(GET_PROYECTOS_LIDER, {
        variables: {
            id: idLider
        }
    });


    const { data: misInscripciones } = useQuery(GET_INSCRIPCIONES);


    const [proyectos, setProyectos] = useState([]);

    const [inscripciones, setInscripciones] = useState([]);


    useEffect(() => {
        if (misProyectos) {
            setProyectos(misProyectos.ProyectosPorLider);
        }
    } , [misProyectos]);

    useEffect(() => {
        if (misInscripciones) {
            setInscripciones(misInscripciones.Inscripciones);
        }
    } , [misInscripciones]);


    let idsProyectos = [];  // ids de los proyectos que el lider tiene asignados

    if(proyectos) {
        idsProyectos = proyectos.map(proyecto => proyecto.id);
    }

    let inscripcionesFiltradas = [];  // inscripciones que pertenecen a los proyectos que el lider tiene asignados

    if(inscripciones) {
        inscripcionesFiltradas = inscripciones.filter(inscripcion => idsProyectos.includes(inscripcion.idProyecto.id));
    }


    const [aprobarInscripcion] = useMutation(APROBARINSCRIPCION);
    const [eliminarInscripcion] = useMutation(ELIMINARINSCRIPCION);

    const handleAprobarInscripcion = async (idInscripcion) => {

        await aprobarInscripcion({
            variables: {
                id: idInscripcion
            },
            onCompleted: () => {
                swal("Inscripcion Aprobada", "La inscripcion ha sido aprobada", "success");
                setInscripciones(inscripciones.filter(inscripcion => inscripcion.id !== idInscripcion));
            },
            onError: () => {
                swal("Error", "La inscripcion no ha podido ser aprobada", "error");
            }
        });
    }

    const handleEliminarInscripcion = async (idInscripcion) => {

        await eliminarInscripcion({
            variables: {
                id: idInscripcion
            },
            onCompleted: () => {
                swal("Inscripcion Eliminada", "La inscripcion ha sido eliminada", "success");
                setInscripciones(inscripciones.filter(inscripcion => inscripcion.id !== idInscripcion));
            },
            onError: () => {
                swal("Error", "La inscripcion no ha podido ser eliminada", "error");
            }
        });
    }

    



    return (
        <>
            <Navigation />
            <div className="container text-center">
                <h2>Aprobar inscripciones</h2>

                <p>A continuación se muestran las inscripciones que tienes pendientes de aprobación en tus proyectos</p>

                { inscripcionesFiltradas.length === 0  &&
                    <div className="alert alert-info" role="alert">
                        No hay inscripciones pendientes para tus proyectos
                    </div>
                }

                { inscripcionesFiltradas.length > 0 &&
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Proyecto</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Identificacion</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inscripcionesFiltradas.map(inscripcion => (
                                    <tr key={inscripcion.id}>
                                        <td>{inscripcion.idProyecto.nombre}</td>
                                        <td>{inscripcion.idEstudiante.nombres}</td>
                                        <td>{inscripcion.idEstudiante.apellidos}</td>
                                        <td>{inscripcion.idEstudiante.identificacion}</td>
                                        <td>{inscripcion.idEstudiante.correo}</td>
                                        <td>
                                            <button className="btn btn-success m-2" onClick={() => handleAprobarInscripcion(inscripcion.id)}>
                                                Aprobar
                                            </button>
                                            <button className="btn btn-danger m-2" onClick={() => handleEliminarInscripcion(inscripcion.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }


                
            </div>
        </>
    )
}
