import React from 'react'
import {useNavigate } from 'react-router-dom';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import logo from '../images/LogoProjectsTable-Small.png'
import { AUTH_TOKEN } from '../constants'


export const Navigation = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
        <div>
             <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            {authToken && (
                                <>
                                <Nav.Link href="/">Inicio</Nav.Link>
                                <Nav.Link href="/proyectos">Proyectos</Nav.Link>
                                 <NavDropdown title="Estudiantes" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/InscripcionProyecto">Inscribirse a un proyecto</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Lideres" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/NuevoProyecto">Nuevo proyecto</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Administracion" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Usuarios">Lista de usuarios</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/AprobarUsuarios">Aprobar usuarios</NavDropdown.Item>
                                    <NavDropdown.Item href="/AprobarProyectos">Aprobar proyectos</NavDropdown.Item>

                                </NavDropdown>
                                <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <button className="btn" 
                                    onClick={() => {
                                        localStorage.removeItem(AUTH_TOKEN);
                                        navigate(`/login`);
                                    }}
                                    >
                                    Cerrar sesión
                                    </button>
                                </NavDropdown>

                                </>

                            )}

                            {!authToken && (
                                <>
                                <button className="btn" onClick={() => navigate('/Login')}>
                                    Iniciar sesión o registrarse
                                </button>
                                </>
                            )}
  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </div>
    )
}
