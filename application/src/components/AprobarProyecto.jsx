import React  from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation'
import { APROBARPROYECTO } from '../Apollo/gql/aprobarProyecto';
import { useState } from 'react';
import swal from 'sweetalert';

export const AprobarProyecto = () => {

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_PROYECTOS);
    let proyectosPorAprobar = [];
    if(data){
        proyectosPorAprobar = data.Proyectos.filter(proyecto => (proyecto.estadoProyecto === 'Inactivo' && proyecto.fase === ''));
    }

    const [formState, setFormState] = useState({
        idProyecto: ''
    });


    const [aprobarProyecto] = useMutation(APROBARPROYECTO, {
        variables: {
            id: formState.idProyecto
        },
        onCompleted: () => {
            swal("Proyecto Aprobado", "El proyecto ha sido aprobado", "success");
            console.log(formState.idProyecto);
        },
        onError: (error) => {
            swal("Error", "El proyecto no ha podido ser aprobado", "error");
        }
    });

    const handleAprobarProyecto = (id) => {
        setFormState({
            idProyecto: id
        });
        aprobarProyecto();
        
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
                                        
                                        <div className="card-footer">
                                        <button className="btn btn-info m-1">Info</button>
                                        <button className="btn btn-primary m-1" onClick={() => handleAprobarProyecto(proyecto.id)}>Aprobar</button>

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
