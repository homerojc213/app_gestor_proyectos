import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import GET_USUARIOS from '../Apollo/gql/getUsuarios';
import { Navigation } from './Navigation';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Usuarios = () => {
    const navigate = useNavigate();
    const apollo = useQuery(GET_USUARIOS);
    const [usuarios, setUsuarios] = useState([]);
    const [rol, setRol] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);
    let token;
    useEffect(() => {
        if (apollo.data && authToken) {
            setUsuarios(apollo.data.Usuarios);
            token = JSON.parse(window.atob(authToken.split('.')[1]));
            setRol(token.rol);
        }
    }, [apollo.data]);

    const nuevousuario = () => {
        navigate('/NuevoUsuario');
    }

    return (
        <>
            <Navigation />
            <div className="container">
                <br /><br />
                {/* {loading && <p>Cargando...</p>}
                {error && <p>Error</p>} */}
                <Row xs={3} md={5} className="g-4">
                    {rol === 'Administrador' ? (
                        <div>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_ymGyjK60VWc89uuFt56e-mSiaPbqf4yTQ&usqp=CAU" />
                                    <Card.Body>
                                        <Card.Title>Nuevo Usuario</Card.Title>
                                        <Card.Text >
                                           Ingrese un nuevo Usuario
                                           <br/><br/><br/>
                                           <Button onClick={nuevousuario} variant="outline-primary">Nuevo Usuario</Button>{' '}
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
                                        <Card.Text >
                                            <div>
                                                {//Solo el administrador puede consultar los usuarios y crear nuevos usuarios 
                                                }
                                                {rol === 'Administrador' ? (
                                                    <div>
                                                        <Button variant="outline-info">Editar</Button>{' '}
                                                        <Button variant="outline-danger">Aprobar</Button>{' '}
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
