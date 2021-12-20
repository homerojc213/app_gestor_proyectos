import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants'
import { GET_AVANCES_PROYECTO } from '../Apollo/gql/getAvancesProyecto.js';
import AgregarObservacion from './AgregarObservacion';
import swal from 'sweetalert';

export const ObservacionAvance = () => {
    

    const [formState, setFormState] = useState({
        descripcion: '',
      });

    const { idAvance } = useParams();
    const { loading, error, data } = useQuery(GET_AVANCES_PROYECTO, {
        variables: {
            id: idAvance
        }
    });

    

    console.log(data);

    const [observaciones, setObservaciones] = useState([]);

    useEffect(() => {
        if (data) {
            setAvances(data.ObservacionesPorAvance);
        }
    }, [data]);


    return (
        <>
            <Navigation />
            <div className="container text-center">

                <h2>Observaciones de los avances</h2>

                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los las observaciones de los avances :(</p>}
                    <AgregarObservacion formState={formState} setFormState={setFormState}  />
                {observaciones.length === 0 && <p>No hay observaciones para este proyecto</p>}
            

                {observaciones.length > 0 &&

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
                                        <button className="btn btn-primary">Agregar observación</button>{" "}
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
