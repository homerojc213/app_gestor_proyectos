import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_TOKEN } from '../constants'
import { GET_AVANCES_PROYECTO } from '../Apollo/gql/getAvancesProyecto.js';
import ModalNuevoAvance from './ModalNuevoAvance';
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider';

export const AvancesProyecto = () => {
    
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

    return (
        <>
            <Navigation />
            <div className="container text-center">

                <h2>Avances del proyecto</h2>

                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los avances del proyecto :(</p>}
                    <ModalNuevoAvance />
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
                                    <td>{avance.observaciones ? avance.observaciones : 'Sin observaciones'}</td>
                                    <td>
                                        <button className="btn btn-primary">Agregar observación</button>
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
