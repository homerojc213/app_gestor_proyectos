import React from 'react'
import { Navigation } from './Navigation';
import {useParams } from 'react-router-dom';

export const AvancesProyecto = () => {

    const { idProyecto } = useParams();

    return (
        <>
            <Navigation />
            <div className="container">
                <h2>Avances del proyecto</h2>

                



            </div>

        </>
    )
}
