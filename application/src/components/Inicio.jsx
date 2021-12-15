import React from 'react'
import { Navigation } from './Navigation'
import { Carousel } from 'react-bootstrap';

export const Inicio = () => {
    return (
        <>
            <Navigation />
        <div className='container'>
            <h2>Bienvenido a ProjectsTable, tu gestor de proyectos</h2>
            <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.thoughtco.com/thmb/Q21TDmXJ3NnF-YxXeY6g6olnbXc=/2121x1414/filters:fill(auto,1)/GettyImages-469951129-b18fdc733b8f4c0893f820cabcd6ec91.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://intl-blog.imgix.net/wp-content/uploads/2019/03/cinco-software-de-gesti%C3%B3n-de-proyectos-de-c%C3%B3digo-abierto.jpg?auto=format%2Cenhance"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://intl-blog.imgix.net/wp-content/uploads/2019/02/Software-de-gesti%C3%B3n-de-proyectos.png?auto=format%2Cenhance"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
        </>
    )
}
