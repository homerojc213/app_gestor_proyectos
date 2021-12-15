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
        })
        .then(res => {
            if (res.data.ValidarInscripcion) {
                swal("Ya estas inscrito en este proyecto", "", "error");
            }else{
                swal("Inscripcion exitosa", "", "success");
            }

        })
        .catch(err => {
            swal("Error al validar tu inscripción actual", "", "error");
        });
    }


    const handleInscripcion = async (id) => {

        validarInscripcionUser(id)
        
        

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
