import React from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import logo from '../images/LogoProjectsTable-Small.png'


export const Navigation = () => {
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
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <NavDropdown title="Proyectos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/Proyectos">Lista de proyectos</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/NuevoProyecto">Nuevo proyecto</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Administracion" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/Usuarios">Lista de usuarios</NavDropdown.Item>
                            </NavDropdown>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </div>
    )
}
