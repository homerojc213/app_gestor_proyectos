import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import swal from 'sweetalert';
import {AGREGAR_OBSERVACION} from '../Apollo/gql/agregarObservacion'
import { useParams } from 'react-router-dom';

const AgregarObservacion = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { idObservacion } = useParams();

    // const [formState, setFormState] = useState({
    //     descripcion: '',
    //   });
      
    const [agregarObservacion] = useMutation(AGREGAR_OBSERVACION , {
        variables: {
            idObservacion: idObservacion,
            observacion: props.formState.observacion
        },
        onCompleted: () => {
            props.setFormState({
                observacion: '',
            })
            swal('Observacion creada', 'Creación Exitosa', 'success');
        },
        onError: (error) => {
            swal('Error', error.message, 'error');
        }
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.formState.observacion === '' ){
            swal("Error", "Todos los campos son obligatorios", "error");
        }else{
            console.log("idObservacion: ",idObservacion, " descripcion: ", props.formState.observacion)
            agregarObservacion();
            handleClose();
        }
    };
    return (
        <>
            <div style={{
                display: "flex",
                flexWrap: "wrap",

            }} >
                <button className="btn btn-primary"
                    style={{
                        verticalAlign: ""
                    }}
                    onClick={handleShow} >Agregar Observacion</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Observacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    
                    <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            onChange={e => props.setFormState({...props.formState, observacion: e.target.value})}
                        />
                    </FloatingLabel>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Agregar Observacion
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AgregarObservacion;