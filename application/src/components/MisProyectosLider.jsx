import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigation } from './Navigation'
import { AUTH_TOKEN } from '../constants'
import GET_PROYECTOS_LIDER from '../Apollo/gql/getProyectosLider'


export const MisProyectosLider = () => {


    const authToken = localStorage.getItem(AUTH_TOKEN);
    const idLider = JSON.parse(window.atob(authToken.split('.')[1])).uid; 

    
    const  { loading, error, data } = useQuery(GET_PROYECTOS_LIDER, {
        variables: {
            id: idLider
        }
    });

  

  
    return (
        <>
        <Navigation />
        <div className="container">

            <h2>Mis Proyectos</h2>

            {loading && <p>Cargando...</p>}
            {error && <p>Error al cargar tus proyectos :(</p>}

        </div>
        </>
    )
}
