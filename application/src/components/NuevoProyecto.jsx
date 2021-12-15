import React, { useState } from 'react'
import { Navigation } from './Navigation'
import { AGREGARPROYECTO } from '../Apollo/gql/agregarProyecto'
import swal from 'sweetalert';
import { AUTH_TOKEN } from '../constants'
import { useMutation } from '@apollo/client';

export const NuevoProyecto = () => {

    const authToken = localStorage.getItem(AUTH_TOKEN);

    const idLider = JSON.parse(window.atob(authToken.split('.')[1])).uid;

    const [formState, setFormState] = useState({
        nombre: '',
        presupuesto: 0,
        objGeneral: '',
        objEspecificos: '',
        idLider: idLider
      });

    const [agregarProyecto] = useMutation(AGREGARPROYECTO , {
        variables: {
            nombre: formState.nombre,
            presupuesto: formState.presupuesto,
            objGeneral: formState.objGeneral,
            objEspecificos: formState.objEspecificos.split(','),
            idLider: formState.idLider
        },
        onCompleted: () => {
            swal('Proyecto creado', 'El proyecto se ha creado correctamente, debes esperar su aprobación', 'success');
        },
        onError: (error) => {
            swal('Error', error.message, 'error');
        }
        
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if(formState.nombre === '' || formState.presupuesto === 0 || formState.objGeneral === '' || formState.objEspecificos === ''){
            swal("Error", "Todos los campos son obligatorios", "error");
        }else{
            agregarProyecto();
            clearForm();
            
            
        }
        
    }


    const clearForm = () => {
        document.getElementById("crearProyecto").reset();
    }

    return (
        <>
            <Navigation />
        <div className="container text-center">
            <h2>Nuevo Proyecto</h2>

            <p>En esta sección podrás proponer un nuevo proyecto, el cual estará sujeto a aprobación por parte de un administrador</p>
            <p>¿En qué andas pensando?</p>

            <div className='form-nuevoProyecto'>

            <form id="crearProyecto">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del proyecto</label> 
                    <input type="text" className="form-control" id="nombre"  
                    onChange={e => setFormState({...formState, nombre: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="presupuesto">Presupuesto</label>
                    <input type="number" className="form-control" id="presupuesto" 
                    onChange={e => setFormState({...formState, presupuesto: Number(e.target.value)})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="objGeneral">Objetivo General</label>
                    <textarea className="form-control" id="objGeneral" rows="3" 
                    onChange={e => setFormState({...formState, objGeneral: e.target.value})}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="objEspecificos">Objetivos Específicos <small className="font-weight-bold">(separados por comas)</small></label>
                    <textarea className="form-control" id="objEspecificos" rows="3" 
                    onChange={e => setFormState({...formState, objEspecificos: e.target.value})}></textarea>
                </div>
                <button 
                type="submit" 
                className="btn btn-submit mt-3"
                onClick={handleSubmit}
                >
                    Enviar propuesta
                </button>

            </form>

            </div>


            



        </div>
        </>
    )
}
