import React, { useEffect } from 'react'
import { Navigation } from './Navigation'


export const Proyectos = () => {

    useEffect(() => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                query: `
                    query {
                        Proyectos {
                            id
                            nombre
                        }
                    }
                `
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))
    })
        
    return (
        <div className="container">
            <Navigation />
            <h2>Proyectos</h2>
        </div>
    )
}
