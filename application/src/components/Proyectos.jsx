import {useQuery} from '@apollo/client';
import React from 'react'
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation'


export const Proyectos = () => {

    const {loading, data, error} = useQuery(GET_PROYECTOS)  //Hook para ejecutar consultas

    console.log(data);
    return (
        <>
        <Navigation />
        <div className="container">
            <h2>Proyectos</h2>
            {loading && <p>Cargando...</p>}
            {error && <p>Error</p>}

            
        </div>
        </>
    )
}
