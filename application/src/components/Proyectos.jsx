import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation';
import { Row, Col, Card, } from 'react-bootstrap';


export const Proyectos = () => {

    const apollo = useQuery(GET_PROYECTOS);
    const [proyectos, setProyectos] = useState([]);
    useEffect(() => {
        if (apollo.data) {
            setProyectos(apollo.data.Proyectos);
        }
    });

    return (
        <>
            <Navigation />
            <div className="container">
                <h2>Proyectos</h2>
                {/* {loading && <p>Cargando...</p>}
                {error && <p>Error</p>} */}
                <Row xs={1} md={4} className="g-4">
                    {(proyectos[0] != null) && proyectos.map(proyecto => {
                        return (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" />
                                    <Card.Body>
                                        <Card.Title>{proyecto.nombre}</Card.Title>
                                        <Card.Text>
                                            {proyecto.nombre}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </>
    );
};
