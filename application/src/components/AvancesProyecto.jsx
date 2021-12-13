import React from 'react'
import { Navigation } from './Navigation';
import {useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTH_TOKEN } from '../constants'
import { GET_AVANCES_PROYECTO} from '../Apollo/gql/getAvancesProyecto.js';

export const AvancesProyecto = () => {

    const { idProyecto } = useParams();

    const authToken = localStorage.getItem(AUTH_TOKEN);

    const role = JSON.parse(window.atob(authToken.split('.')[1])).rol || "";

    const  { loading, error, data } = useQuery(GET_AVANCES_PROYECTO, {
        variables: {
            id: idProyecto
        }
    });

    return (
        <>
            <Navigation />
            <div className="container">

                <h2>Avances del proyecto</h2>

                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los avances del proyecto :(</p>}


            </div>

        </>
    )
}
