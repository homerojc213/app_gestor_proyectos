import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ELIMINAR_PROYECTO } from '../Apollo/gql/eliminarProyecto';
import swal from 'sweetalert';
export const Proyectos = () => {
    const navigate = useNavigate();
    const apollo = useQuery(GET_PROYECTOS);
    const [proyectos, setProyectos] = useState([]);
    const [rol, setRol] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);
    let token;
    useEffect(() => {
        if (apollo.data && authToken) {
            setProyectos(apollo.data.Proyectos);
            token = JSON.parse(window.atob(authToken.split('.')[1]));
            setRol(token.rol);
        }
    }, [apollo.data]);

    const nuevoProyecto = () => {
        navigate('/nuevoProyecto');
    }

    

    const [eliminarProyecto] = useMutation(ELIMINAR_PROYECTO);

    const handlerEliminarProyecto = async (id) => {
        await eliminarProyecto({
            variables: {
                id: id
            },
            onCompleted: () => {
                swal("Proyecto Eliminado", "El proyecto ha sido eliminado", "success");
                setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
            },
            onError: (error) => {
                swal("Error", "El proyecto no ha sido eliminado", "error");
                console.log(error)
            }
        });
    }

    return (
        <>
            <Navigation />
            <div className="container">
                <br /><br />
                {/* {loading && <p>Cargando...</p>}
                {error && <p>Error</p>} */}
                <Row xs={1} md={3} className="g-4">
                    {rol === 'Lider' ? (
                        <div>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" />
                                    <Card.Body>
                                        <Card.Title>Nuevo Proyecto</Card.Title>
                                        <Card.Text >
                                            Ingrese un nuevo proyecto
                                            <br /><br /><br />
                                            <Button onClick={nuevoProyecto} variant="outline-primary">Nuevo Proyecto</Button>{' '}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                    ) : ''}
                    {(proyectos[0] != null) && proyectos.map(proyecto => {
                        if (proyecto.estadoProyecto === 'Activo') {
                            return (
                                <div key={proyecto.id} >
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" />
                                            <Card.Body>
                                                <Card.Title>{proyecto.nombre}</Card.Title>
                                                <Card.Text >
                                                    <br />
                                                    {"3/5 participantes"}
                                                    <br /><br />
                                                    <div>
                                                        {rol === 'Administrador' ? (
                                                            <div>
                                                                <Button variant="outline-primary">Ingresar</Button>{' '}
                                                                <Button variant="outline-info">Info</Button>{' '}
                                                                <Button variant="outline-danger"
                                                                    onClick={() => handlerEliminarProyecto(proyecto.id)}
                                                                >Borrar</Button>{' '}
                                                            </div>
                                                        ) : ''}

                                                        {//el lider solo ingresa a sus proyectos y puede crear proyectos nuevos 
                                                        }

                                                        {rol === 'Lider' ? (
                                                            <div>
                                                                <Button variant="outline-primary">Ingresar</Button>{' '}
                                                                <Button variant="outline-info">Info</Button>{' '}
                                                            </div>
                                                        ) : ''}

                                                        {rol === 'Estudiante' ? (
                                                            <div>
                                                                <Button variant="outline-primary">Participar</Button>{' '}
                                                                <Button variant="outline-info">Info</Button>{' '}
                                                            </div>
                                                        ) : ''}
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>

                            );
                        }

                    })}
                </Row>
            </div>
        </>
    );
};
