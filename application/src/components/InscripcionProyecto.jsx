import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_PROYECTOS from '../Apollo/gql/getProyectos';
import { INSCRIBIRSE_PROYECTO } from '../Apollo/gql/inscribirseProyecto';
import { GET_INSCRIPCIONES_ESTUDIANTE } from '../Apollo/gql/getInscripcionesEstudiante';

import { Navigation } from './Navigation';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import swal from 'sweetalert';

export const InscripcionProyecto = () => {


    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const idEstudiante = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";


    const [proyectos, setProyectos] = useState([]);

    const [inscripciones, setInscripciones] = useState([]);

    const { data:listaInscripciones } = useQuery(GET_INSCRIPCIONES_ESTUDIANTE, {
        variables: { id: idEstudiante },
    });


    const  { loading, error, data:listaProyectos } = useQuery(GET_PROYECTOS);

    useEffect(() => {
        if (listaProyectos) {
            setProyectos(listaProyectos.Proyectos);
        }
    }, [listaProyectos]);
    

    useEffect(() => {
        if (listaInscripciones) {
            setInscripciones(listaInscripciones.InscripcionesPorEstudiante);
        }
    } , [listaInscripciones]);


    let proyectosInscritos = inscripciones.filter(inscripcion => inscripcion.id);

    const isInscrito = (idProyecto) => {
        return proyectosInscritos.find(inscripcion => inscripcion.idProyecto.id === idProyecto);
    }
  


    const [agregarInscripcion] = useMutation(INSCRIBIRSE_PROYECTO);


    const handleInscripcion = async (id) => {
        await isInscrito(id) ? 
        swal("Error", "Ya estás inscrito o te has intentado inscribir antes a este proyecto", "error") :
        await agregarInscripcion({
            variables: {
                idProyecto: id,
                idUsuario: idEstudiante
            },
            onCompleted: () => {
                swal("Inscripción exitosa", "", "success");
                setProyectos(proyectos.filter(proyecto => proyecto.id !== id));

            },
            onError: (error) => {
                swal("Error", error.message, "error");
            }
        });
    
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
