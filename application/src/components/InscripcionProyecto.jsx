import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { INSCRIBIRSE_PROYECTO } from '../Apollo/gql/inscribirseProyecto';
import { VALIDAR_INSCRIPCION } from '../Apollo/gql/validarInscripcion';

import { Navigation } from './Navigation';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import swal from 'sweetalert';

export const InscripcionProyecto = () => {

    const [estadoInscripcion, setEstadoInscripcion] = useState("");


    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const idEstudiante = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";


    const [proyectos, setProyectos] = useState([]);

    const  { loading, error, data } = useQuery(GET_PROYECTOS);

    useEffect(() => {
        if (data) {
            setProyectos(data.Proyectos);
        }
    } , [data]);

    const [agregarInscripcion] = useMutation(INSCRIBIRSE_PROYECTO);

    const [ValidarInscripcion, result] = useLazyQuery(VALIDAR_INSCRIPCION);

    const validarInscripcionUser = (idProyecto) => {
        ValidarInscripcion({
            variables: {
                idProyecto: idProyecto,
                idUsuario: idEstudiante
            }
        }).then(res => {
            if (res.data.ValidarInscripcion == "Pendiente"){
                setEstadoInscripcion("Pendiente");
            }else if(res.data.ValidarInscripcion == "Aprobado"){
                setEstadoInscripcion("Aprobado");
            }else if(res.data.ValidarInscripcion == "Inexistente"){
               setEstadoInscripcion("Inexistente");
            }

        }).catch(err => {
            console.log(err);
        });
    }

    const handleInscripcion = async (id) => {

        validarInscripcionUser(id);

        if (estadoInscripcion == "Pendiente"){
            swal("Inscripción Pendiente", "Ya estás inscrito en este proyecto", "warning");
        }else if(estadoInscripcion == "Aprobado"){
            swal("Ya estás inscripto", "No puedes volver a intentar inscribirte", "success");
        }else if(estadoInscripcion == "Inexistente"){

            await agregarInscripcion({
                variables: {
                    idProyecto: id,
                    idUsuario: idEstudiante
                },
                onCompleted: () => {
                    swal("Solicitud", "Se ha enviado tu solicitud de inscripción, debes esperar la aprobación por parte del lider", "success");
                    setEstadoInscripcion("Pendiente");
                },
                onError: () => {
                    swal("Error", "No se ha podido procesar tu solicitud", "error");
                }
            });
           
        }
    }

    return (
        <>
        <Navigation />
        <div className="container text-center">
            <h2>Inscribirse a un proyecto</h2>

            
            <br /><br />
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los proyectos</p>}
           
                <Row xs={1} md={3} className="g-4">
                    {(proyectos[0] != null) && proyectos.map(proyecto => {
                        if (proyecto.estadoProyecto === 'Activo') {
                            return (
                                <div key={proyecto.id} >
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg" />
                                            <Card.Body>
                                                <Card.Title>{proyecto.nombre}</Card.Title>
                                                <Card.Text as = 'div'>
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
                                              
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button variant="primary" onClick={() => handleInscripcion(proyecto.id)}>Inscribirse</Button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </div>

                            );
                        }

                    })}
                </Row>

        </div>
        </>
    )
}
