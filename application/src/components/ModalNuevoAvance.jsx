import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import swal from 'sweetalert';
import {AGREGAR_AVANCE} from '../Apollo/gql/agregarAvance'
import { useParams } from 'react-router-dom';
const ModalNuevoAvance = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { idProyecto } = useParams();

    // const [formState, setFormState] = useState({
    //     descripcion: '',
    //   });
      
    const [agregarAvance] = useMutation(AGREGAR_AVANCE , {
        variables: {
            idProyecto: idProyecto,
            descripcion: props.formState.descripcion
        },
        onCompleted: () => {
            props.setFormState({
                descripcion: '',
            })
            swal('Avance creado', 'Creación Exitosa', 'success');
        },
        onError: (error) => {
            swal('Error', error.message, 'error');
        }
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.formState.descripcion === '' ){
            swal("Error", "Todos los campos son obligatorios", "error");
        }else{
            console.log("idProyecto: ",idProyecto, " descripcion: ", props.formState.descripcion)
            agregarAvance();
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
                    onClick={handleShow} >Agregar avance</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo avance</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    
                    <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            onChange={e => props.setFormState({...props.formState, descripcion: e.target.value})}
                        />
                    </FloatingLabel>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Agregar avance
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNuevoAvance;