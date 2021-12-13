import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useMutation } from '@apollo/client';
import { APROBARPROYECTO } from '../Apollo/gql/aprobarProyecto';

export const AprobarProyecto = () => {
    const navigate = useNavigate();
    const apollo = useQuery(GET_PROYECTOS)
    const [proyectos, setProyectos] = useState([]);
    const [proyectosPorAprobar, setProyectosPorAprobar] = useState([]);
    const [rol, setRol] = useState('');
    const [ide,setIde] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);
    let token;
    const [mostrarProyectos, setMostrarProyectos] = useState(true);

    const cargarProyectos = () => {
        if (apollo.data && authToken && mostrarProyectos) {
            setProyectos(apollo.data.Proyectos);
            token = JSON.parse(window.atob(authToken.split('.')[1]));
            setRol(token.rol);

            const porAprobar = apollo.data.Proyectos.filter((proyecto) => {
                if (proyecto.estadoProyecto === "Inactivo") {
                    return proyecto;
                }
            });
            setProyectosPorAprobar(porAprobar);
            setMostrarProyectos(false);
        }
    }

    cargarProyectos();

    const nuevoProyecto = () => {
        navigate('/nuevoProyecto');
    }

    const [aprobarProyecto] = useMutation(APROBARPROYECTO, {
        variables: {
            _id: ide
        },
        onCompleted: () => {
            swal('Proyecto creado', 'El proyecto se ha creado correctamente, debes esperar su aprobación', 'success')
        },
        onError: (error) => {
            swal('Error', error.message, 'error')
        }
    }
    );

    return (
        <>
            <Navigation />
            <div className="container">
                <br /><br />
                {/* {loading && <p>Cargando...</p>}
                {error && <p>Error</p>} */}
                <Row xs={1} md={3} className="g-4">
                    {proyectosPorAprobar &&
                        proyectosPorAprobar.map((proyecto, indice) => {
                            console.log(proyectosPorAprobar)
                            return (
                                <div key={indice} >
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" />
                                            <Card.Body>
                                                <Card.Title>{proyecto._id}</Card.Title>
                                                <Card.Text >
                                                    <br />
                                                    {"3/5 participantes"}
                                                    <br /><br />
                                                    <div>
                                                        {rol === 'Administrador' ? (
                                                            <div>
                                                                <Button
                                                                    variant="outline-primary"
                                                                    onClick={() => {
                                                                        setIde(proyecto._id)
                                                                        
                                                                        aprobarProyecto()
                                                                    }}
                                                                >Aceptar</Button>{' '}
                                                                <Button variant="outline-info">Info</Button>{' '}
                                                                <Button variant="outline-danger">Rechazar</Button>{' '}
                                                            </div>
                                                        ) : ''}

                                                        {//el lider solo ingresa a sus proyectos y puede crear proyectos nuevos 
                                                        }

                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>

                            );

                        })}
                </Row>
            </div>
        </>
    );
}
