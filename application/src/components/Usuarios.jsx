import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_USUARIOS from '../Apollo/gql/getUsuarios';
import { Navigation } from './Navigation';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Usuarios = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN) || "";
    const rol = JSON.parse(window.atob(authToken.split('.')[1])).rol || "";

    const [usuarios, setUsuarios] = useState([]);

    const  { loading, error, data } = useQuery(GET_USUARIOS);

    useEffect(() => {
        if (data) {
            setUsuarios(data.Usuarios);
        }
    } , [data]);


    const nuevousuario = () => {
        navigate('/NuevoUsuario');
    }

    return (
        <>
            <Navigation />
            <div className="container">
                <br /><br />
                
                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar los usuarios</p>}

                <Row xs={2} md={4} className="g-4">
                    {rol === 'Administrador' ? (
                        <div>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_ymGyjK60VWc89uuFt56e-mSiaPbqf4yTQ&usqp=CAU" />
                                    <Card.Body>
                                        <Card.Title>Nuevo usuario</Card.Title>
                                        <Card.Text as = 'div' >
                                           Ingrese un nuevo usuario
                                           <br/><br/><br/>
                                           <Button onClick={nuevousuario} variant="outline-primary">Nuevo usuario</Button>{' '}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                    ) : ''}
                    {(usuarios[0] != null) && usuarios.map(usuario => {
                        return (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_ymGyjK60VWc89uuFt56e-mSiaPbqf4yTQ&usqp=CAU"/>
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <tr>Id: {usuario.id}</tr>
                                        <tr>Nombre: {usuario.nombres} {usuario.apellidos}</tr>
                                        <tr>Identificacion: {usuario.identificacion}</tr>
                                        <tr>Email: {usuario.correo}</tr>
                                        <tr>Rol: {usuario.rol}</tr>
                                        <tr>Estado: {usuario.estado}</tr>
                                        <Card.Text as = 'div'>
                                            <div>
                                                {//Solo el administrador puede consultar los usuarios y crear nuevos usuarios 
                                                }
                                                {rol === 'Administrador' ? (
                                                    <div>
                                                        <Button variant="outline-info">Editar</Button>{' '}
                                                    </div>
                                                ) : ''}

                                                {//el lider solo ingresa a sus proyectos y puede crear proyectos nuevos 
                                                }

                                                {/* {rol === 'Lider' ? (
                                                    <div>
                                                        <Button variant="outline-primary">Editar</Button>{' '}
                                                    </div>
                                                ) : ''}

                                                {rol === 'Estudiante' ? (
                                                    <div>
                                                        <Button variant="outline-primary">Editar</Button>{' '}
                                                    </div>
                                                ) : ''} */}

                                            </div>
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
