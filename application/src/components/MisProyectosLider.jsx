import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from './Navigation'
import { AUTH_TOKEN } from '../constants'
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider'
import { useNavigate } from 'react-router-dom';
import { ELIMINAR_PROYECTO } from '../Apollo/gql/eliminarProyecto';
import swal from 'sweetalert';

export const MisProyectosLider = () => {

    const navigate = useNavigate();


    const authToken = localStorage.getItem(AUTH_TOKEN);

    const idLider = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";
    const nombres = JSON.parse(window.atob(authToken.split('.')[1])).nombres || "";
    const [proyectosActivos, setProyectosActivos] = useState([]);


    const cargarDatos = new Promise(
        async (resolve, rejected) => {
            const { loading, error, data } = useQuery(GET_PROYECTOS_LIDER, {
                variables: {
                    id: idLider
                }
            });
            resolve(data);
        }
    );
    cargarDatos.then(
        (data) => {
            const datos = data.ProyectosPorLider.filter(proyecto => proyecto.estadoProyecto === 'Activo')
            setProyectosActivos(datos);

        }
    );




    // let proyectosActivos = [];
    let proyectosPendientes = [];
    let proyectosTerminados = [];

    if (data) {
        // proyectosActivos = data.ProyectosPorLider.filter(proyecto => proyecto.estadoProyecto === 'Activo');
        proyectosPendientes = data.ProyectosPorLider.filter(proyecto => proyecto.fase === '');
        proyectosTerminados = data.ProyectosPorLider.filter(proyecto => proyecto.fase === 'Terminado');
    }


    const nuevoProyecto = () => {
        navigate('/nuevoProyecto');
    }


    const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);

    const handlerEliminarProyecto = async (id) => {
        await eliminarProyecto({
            variables: {
                id: id
            },
            onCompleted: () => {
                swal("Proyecto Eliminado", "El proyecto ha sido eliminado", "success");
            },
            onError: (error) => {
                swal("Error", "El proyecto no ha sido eliminado", "error");
                console.log(error)
            }
        });
    }

    return (
        <>
            <Navigation />
            <div className="container text-center">

                <h2>Mis Proyectos</h2>

                <p>Hola {nombres}, esta es tu lista actual de proyectos</p>

                {/* {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar tus proyectos :(</p>} */}

                <div className="row mt-5">
                    <h4>Proyectos Activos</h4>

                    {proyectosActivos.length === 0 && <><p>No tienes proyectos activos: </p><button className="btn btn-primary" onClick={nuevoProyecto}>Propone un nuevo proyecto</button></>}
                    {proyectosActivos.length > 0 &&
                        proyectosActivos.map(proyecto => (
                            <div className="col-md-4" key={proyecto.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{proyecto.nombre}</h5>
                                        <p className="card-text">Presupuesto: {proyecto.presupuesto}</p>
                                        <p className="card-text">Objetivo general: {proyecto.objGeneral}</p>
                                        <p className="card-text">Fecha de inicio: {proyecto.fechaInicio}</p>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => navigate(`/AvancesProyecto/${proyecto.id}`)}>Ver avances del proyecto</button>
                                    <button className="btn btn-danger" onClick={() => handlerEliminarProyecto(proyecto.id)}>Eliminar proyecto</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <hr />


                <div className="row mt-5">
                    <h4>Proyectos pendientes de aprobación</h4>

                    {proyectosPendientes.length === 0 && <p>No tienes proyectos pendientes de aprobación</p>}
                    {proyectosPendientes.length > 0 &&
                        proyectosPendientes.map(proyecto => (
                            <div className="col-md-4" key={proyecto.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{proyecto.nombre}</h5>
                                        <p className="card-text">Presupuesto: {proyecto.presupuesto}</p>
                                        <p className="card-text">Objetivo general: {proyecto.objGeneral}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <hr />

                <div className="row mt-5">
                    <h4>Proyectos terminados</h4>

                    {proyectosTerminados.length === 0 && <p>No tienes proyectos terminados</p>}
                    {proyectosTerminados.length > 0 &&
                        proyectosTerminados.map(proyecto => (
                            <div className="col-md-4" key={proyecto.id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">{proyecto.nombre}</h5>
                                        <p className="card-text">Presupuesto: {proyecto.presupuesto}</p>
                                        <p className="card-text">Objetivo general: {proyecto.objGeneral}</p>
                                        <p className="card-text">Fecha de inicio: {proyecto.fechaInicio}</p>
                                        <p className="card-text">Fecha de finalización: {proyecto.fechaFin}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>









            </div>
        </>
    )
}