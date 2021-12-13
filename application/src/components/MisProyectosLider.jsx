import { useQuery } from '@apollo/client';
import { Navigation } from './Navigation'
import { AUTH_TOKEN } from '../constants'
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider'
import { useNavigate } from 'react-router-dom';


export const MisProyectosLider = () => {

    const navigate = useNavigate();


    const authToken = localStorage.getItem(AUTH_TOKEN);

    const idLider = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";
    const nombres = JSON.parse(window.atob(authToken.split('.')[1])).nombres || "";



    const  { loading, error, data } = useQuery(GET_PROYECTOS_LIDER, {
        variables: {
            id: idLider
        }
    });

    let proyectosActivos = [];
    let proyectosPendientes = [];
    let proyectosTerminados = [];


    if(data){
        proyectosActivos = data.ProyectosPorLider.filter(proyecto => proyecto.estadoProyecto === 'Activo');
        proyectosPendientes = data.ProyectosPorLider.filter(proyecto => proyecto.fase === '');
        proyectosTerminados = data.ProyectosPorLider.filter(proyecto => proyecto.fase === 'Terminado');
    }


    const nuevoProyecto = () => {
        navigate('/nuevoProyecto');
    }



    return (
        <>
        <Navigation />
        <div className="container text-center">

            <h2>Mis Proyectos</h2>

            <p>Hola {nombres}, esta es tu lista actual de proyectos</p>

            {loading && <p>Cargando...</p>}
            {error && <p>Error al cargar tus proyectos :(</p>}

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