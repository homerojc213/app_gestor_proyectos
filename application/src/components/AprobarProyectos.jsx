import React  from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation'
import { APROBARPROYECTO } from '../Apollo/gql/aprobarProyecto';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';

export const AprobarProyectos = () => {

    const { loading, error, data } = useQuery(GET_PROYECTOS);

    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        if (data) {
            setProyectos(data.Proyectos);
        }
    } , [data]);
       
    let proyectosPorAprobar = proyectos.filter(proyecto => (proyecto.estadoProyecto === 'Inactivo' && proyecto.fase === '')) || [];


    const [aprobarProyecto] = useMutation(APROBARPROYECTO);

    const handleAprobarProyecto = async (id) => {

        await aprobarProyecto({
            variables: {
                id: id
            },
            onCompleted: () => {
                swal("Proyecto Aprobado", "El proyecto ha sido aprobado", "success");
                setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
            },
            onError: () => {
                swal("Error", "El proyecto no ha podido ser aprobado", "error");
            }
        });

    }

    return (
        <>
            
            <Navigation />
            <div className="container text-center">
                <div className="row mt-5">
                    <h4>Proyectos pendientes por aprobación</h4>

                        {loading && <p>Cargando...</p>}
                        {error && <p>Error al cargar los proyectos :( </p>}

                        {proyectosPorAprobar.length === 0 && <><p>No hay proyectos pendientes por aprobar</p></>}
                        {proyectosPorAprobar.length > 0 && 
                            proyectosPorAprobar.map(proyecto => (
                                <div className="col-md-4" key={proyecto.id}>
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h5>{proyecto.nombre}</h5>
                                            <img src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" alt="imagen" className="img-fluid" />
                                        </div>
                                        <div className="card-body">
                                            <p>Presupuesto: {proyecto.presupuesto}</p>
                                            <p>Objetivo general: {proyecto.objGeneral}</p>
                                            <p>Objetivos especificos: {proyecto.objEspecificos.forEach(objEspecifico => (
                                                <li>{objEspecifico}</li>
                                            ))}</p>
                                            
                                        </div>
                                        
                                        <div className="card-footer">
                                        <button className="btn btn-primary m-1" onClick={() => 

                                            handleAprobarProyecto(proyecto.id)}>Aprobar</button>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
            
        </>
    );
}
