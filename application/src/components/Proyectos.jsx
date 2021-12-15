import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { Navigation } from './Navigation';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ELIMINAR_PROYECTO } from '../Apollo/gql/eliminarProyecto';
import swal from 'sweetalert';
export const Proyectos = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const rol = JSON.parse(window.atob(authToken.split('.')[1])).rol || "";

    const [proyectos, setProyectos] = useState([]);

    const  { loading, error, data } = useQuery(GET_PROYECTOS);

    useEffect(() => {
        if (data) {
            setProyectos(data.Proyectos);
        }
    } , [data]);
    


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
            <div className="container text-center">

                <h2>Proyectos activos</h2>


                <br /><br />
                <div>
                {loading && <h2>Cargando...</h2>}
                {error && <h2>Error al cargar los proyectos</h2>}
                </div>

                <Row xs={1} md={3} className="g-4">
                    {rol === 'Lider' ? (
                        <div>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://economipedia.com/wp-content/uploads/Inicio-de-un-proyecto.jpg" />
                                    <Card.Body>
                                        <Card.Title>Nuevo Proyecto</Card.Title>
                                        <Card.Text as = 'div' >
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
                                                <Card.Text as = 'div' >
                                                    <br />
                                                    <ListGroup>
                                                    <ListGroup.Item>Participantes: {proyecto.estudiantes.length}</ListGroup.Item>
                                                    <ListGroup.Item>Fecha de inicio: {proyecto.fechaInicio}</ListGroup.Item>
                                                    <ListGroup.Item>Objetivo general: {proyecto.objGeneral}</ListGroup.Item>
                                                    <ListGroup.Item>Objetivos especificos: {proyecto.objEspecificos.map((obj,index) => {
                                                        return (
                                                            <div key={index}>
                                                                {obj}
                                                            </div>
                                                        )
                                                    })}</ListGroup.Item>

                                                </ListGroup>
                                                   
                                            
                                                    <br /><br />
                                                    <div>
                                                        {rol === 'Administrador' ? (
                                                            <div>
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
                                                                <Button variant="outline-primary">Inscribirse</Button>{' '}
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
