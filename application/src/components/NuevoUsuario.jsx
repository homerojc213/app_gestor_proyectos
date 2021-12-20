import React, { useState } from 'react'
import { Navigation } from './Navigation'
import { AGREGAR_USUARIO } from '../Apollo/gql/agregarUsuario'
import swal from 'sweetalert';
import { useMutation } from '@apollo/client';


export const NuevoUsuario = () => {

    const [formState, setFormState] = useState({
        nombres: '',
        apellidos: '',
        identificacion: '',
        correo:'',
        clave:'',
        rol: '',
        estado: '',
      });

    const [agregarUsuario] = useMutation(AGREGAR_USUARIO , {
        variables: {
            nombres: formState.nombres,
            apellidos: formState.apellidos,
            identificacion: formState.identificacion,
            correo:formState.correo,
            clave:formState.clave,
            rol: formState.rol,
            estado: formState.estado,
        },
        onCompleted: () => {
            swal('Usuario creado', 'Creación Exitosa', 'success');
        },
        onError: (error) => {
            swal('Error', error.message, 'error');
        }
        
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if(formState.nombres === '' || formState.apellidos === '' || formState.identificacion === ''
            || formState.correo === '' || formState.clave === '' || formState.rol === '' || formState.estado === ''){
            swal("Error", "Todos los campos son obligatorios", "error");
        }else{
            agregarUsuario();
        }
        
    }

    return (
        <>
            <Navigation />
        <div className="container text-left">
            <h2>Nuevo usuario</h2>

            <p>En esta sección podrás crear un nuevo usuario</p>


            <div className='form-nuevoUsuario'>

           <form>
                <div className="form-group">
                    <label htmlFor="nombre">Nombres</label> 
                    <input type="text" className="form-control" id="nombres"  
                    onChange={e => setFormState({...formState, nombres: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellidos</label> 
                    <input type="text" className="form-control" id="nombres"  
                    onChange={e => setFormState({...formState, apellidos: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="identificacion">Identificacion</label>
                    <input type="number" className="form-control" id="identificacion" 
                    onChange={e => setFormState({...formState, identificacion:  e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="correo">Correo</label>
                    <input type="email" className="form-control" id="correo" 
                    onChange={e => setFormState({...formState, correo: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="clave">Clave</label>
                    <input type="password" className="form-control" id="clave" 
                    onChange={e => setFormState({...formState, clave: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="rol">Rol</label>
                    <select
                    className="form-select"
                    id = "rol"
                    value={formState.rol}
                    onChange={(e) =>
                        setFormState({
                        ...formState,
                        rol: e.target.value
                        })
                    }
                    >
                    <option value="" disabled>Seleccione un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Lider">Lider</option>
                    <option value="Estudiante">Estudiante</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select
                    className="form-select"
                    id = "estado"
                    value={formState.estado}
                    onChange={(e) =>
                        setFormState({
                        ...formState,
                        estado: e.target.value
                        })
                    }
                    >
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="Autorizado">Autorizado</option>
                    <option value="Pendiente">Inactivo</option>
                    </select>
                </div>
                
                <button
                type="submit" 
                className="btn btn-submit mt-3"
                onClick={handleSubmit}
                >
                    Crear Usuario
                </button>
            </form>
            </div>      
        </div>
        </>
    )
}
