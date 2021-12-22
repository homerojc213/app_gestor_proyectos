import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants'
import { GET_AVANCES_PROYECTO } from '../Apollo/gql/getAvancesProyecto.js';
import { AGREGAR_OBSERVACION } from '../Apollo/gql/agregarObservacion.js';
import ModalNuevoAvance from './ModalNuevoAvance';
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider';
import swal from 'sweetalert';
import { ELIMINAR_AVANCE } from '../Apollo/gql/eliminarAvance';
import AgregarObservacion from './AgregarObservacion';

export const AvancesProyecto = () => {


    const [formState, setFormState] = useState({
        descripcion: '',
    });
    
    const [formStateObservaciones, setFormStateObservaciones] = useState({
        observacion: '',
    });

    const { idProyecto } = useParams();
    const { loading, error, data } = useQuery(GET_AVANCES_PROYECTO, {
        variables: {
            id: idProyecto
        }
    });



    console.log(data);

    const [avances, setAvances] = useState([]);

    useEffect(() => {
        if (data) {
            setAvances(data.AvancesPorProyecto);
        }
    }, [data]);



    const [eliminarAvance] = useMutation(ELIMINAR_AVANCE);

    const HandleEliminarAvance = async (idAvance) => {

        await eliminarAvance({
            variables: {
                idAvance: idAvance,
                idProyecto: idProyecto
            },
            onCompleted: () => {
                swal("Avance Eliminado", "El avance ha sido eliminado", "success");
                window.location.reload()
            },
            onError: (error) => {
                console.log("idAvance: ", idAvance, " idProyecto: ", idProyecto);
                swal("Error", "El avance no ha sido eliminado", "error");
                console.log(error)
            }
        });
    }


    return (
        <>
            <Navigation />
            <div className="container text-center">

                <h2>Avances del proyecto</h2>

                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los avances del proyecto :(</p>}
                <ModalNuevoAvance formState={formState} setFormState={setFormState} />
                
                {avances.length === 0 && <p>No hay avances para este proyecto</p>}


                {avances.length > 0 &&

                    <table className="table table-responsive mt-3">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Fecha</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {avances.map(avance => (
                                <tr key={avance.id}>
                                    <td>{avance.fecha_avance}</td>
                                    <td>{avance.descripcion}</td>
                                    <td>{avance.observaciones[0] ? avance.observaciones[0].observacion : 'Sin observaciones'}</td>
                                    <td>
                                        {/* <button className="btn btn-primary"
                                            onClick={() => HandleAgregarObservacion(avance.id)}
                                        >Agregar observación</button>{" "} */}
                                        <AgregarObservacion formStateObservaciones={formStateObservaciones} setFormStateObservaciones={setFormStateObservaciones} idAvance={avance.id} />
                                        <button className="btn btn-danger"
                                            onClick={() => HandleEliminarAvance(avance.id)}
                                        >Eliminar</button>
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
