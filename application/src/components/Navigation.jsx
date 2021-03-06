import React from 'react'
import {useNavigate } from 'react-router-dom';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import logo from '../images/LogoProjectsTable-Small.png'
import { AUTH_TOKEN } from '../constants'


export const Navigation = () => {

    const navigate = useNavigate();

    const authToken = localStorage.getItem(AUTH_TOKEN);

    let role = '';

    if(authToken){
        role = JSON.parse(window.atob(authToken.split('.')[1])).rol;
    }

   

    return (
        <div>
             <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <img src={logo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                                <Nav.Link href="/">Inicio</Nav.Link>

                                <Nav.Link href="/Proyectos">Proyectos</Nav.Link>

                                {role === 'Estudiante' && 

                                 <NavDropdown title="Estudiantes" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/InscripcionProyecto">Inscribirse a un proyecto</NavDropdown.Item>
                                    <NavDropdown.Item href="/MisProyectosEstudiante">Mis Proyectos</NavDropdown.Item>
                                    <NavDropdown.Item href="/MisInscripciones">Mis Inscripciones</NavDropdown.Item>
                                </NavDropdown>

                                }

                                {role === 'Lider' &&
                                <NavDropdown title="Lideres" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/NuevoProyecto">Nuevo proyecto</NavDropdown.Item>
                                    <NavDropdown.Item href="/MisProyectosLider">Mis proyectos</NavDropdown.Item>
                                    <NavDropdown.Item href="/AprobarInscripciones">Aprobar inscripciones</NavDropdown.Item>

                                </NavDropdown>
                                }

                                {role === 'Administrador' &&

                                <NavDropdown title="Administracion" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Usuarios">Lista de usuarios</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/AprobarUsuarios">Aprobar usuarios</NavDropdown.Item>
                                    <NavDropdown.Item 
                                    onClick={()=>navigate(`/Proyectos/AprobarProyectos`)}
                                    >Aprobar proyectos</NavDropdown.Item>
                                </NavDropdown>
                                }

                                {authToken && 
                                <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <button className="btn" 
                                    onClick={() => {
                                        localStorage.removeItem(AUTH_TOKEN);
                                        navigate(`/login`);
                                    }}
                                    >
                                    Cerrar sesi??n
                                    </button>
                                </NavDropdown>
                                }


                            {!authToken && (
                                <>
                                <button className="btn" onClick={() => navigate('/Login')}>
                                    Iniciar sesi??n o registrarse
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
