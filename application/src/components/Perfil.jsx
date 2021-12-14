import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Navigation } from './Navigation'
import { AUTH_TOKEN } from '../constants'
import { ACTUALIZARUSUARIO } from '../Apollo/gql/actualizarUsuario';
import { ACTUALIZARCLAVE } from '../Apollo/gql/actualizarClave';

import swal from 'sweetalert';

import GET_USUARIO_ID from '../Apollo/gql/getUsuarioPorId'


export const Perfil = () => {

    const authToken = localStorage.getItem(AUTH_TOKEN) || null;

    const idUsuario = JSON.parse(window.atob(authToken.split('.')[1])).uid || "";
    const nombres = JSON.parse(window.atob(authToken.split('.')[1])).nombres || "";

    const { loading, error, data } = useQuery(GET_USUARIO_ID , {
        variables: { id: idUsuario }
    });

    const [formState, setFormState] = useState({
        id: idUsuario,
        nombres: "",
        apellidos: "",
        identificacion: "",
        correo: "",
        rol: "",
        estado: "",
        clave1: "",
        clave2: ""
    });


    const [actualizarUsuario] = useMutation(ACTUALIZARUSUARIO , {
        variables: {
            id: idUsuario,
            nombres: formState.nombres,
            apellidos: formState.apellidos,
            identificacion: formState.identificacion,
            correo: formState.correo
        },
        onCompleted: () => {
            swal("Actualizado", "Se actualizaron los datos correctamente", "success");
            
        },
        onError: (error) => {
            swal("Error", error.message, "error");
        }
    });

    const [actualizarClave] = useMutation(ACTUALIZARCLAVE , {
        variables: {
            id: idUsuario,
            clave: formState.clave1,
        },
        onCompleted: () => {
            swal("Correcto", "Clave actualizada", "success");
            setFormState({ ...formState, clave1: "", clave2: "" });
        },
        onError: (error) => {
            swal("Error", error.message, "error");
        }
    });


    useEffect(() => {
        if (data) {
            setFormState(data.UsuarioPorId);
        }
    } , [data]);

    const handleSubmitDatos = (e) => {
        e.preventDefault();
        if(formState.nombres === "" || formState.apellidos === "" || formState.identificacion === "" || formState.correo === ""){
            swal("Error", "Debe llenar todos los campos", "error");
        }else{
            actualizarUsuario();
        }

    }

    const handleSubmitClave = (e) => {
        e.preventDefault();
        if(formState.clave1 === "" || formState.clave2 === ""){
            swal("Error", "Debe llenar todos los campos", "error");
        }else{
            if(formState.clave1 === formState.clave2){
                actualizarClave();
            }else{
                swal("Error", "Las claves no coinciden", "error");
            }
        }
    }





    return (
        <>
            <Navigation />
            <div className="container text-center">

                <h2>Mi perfil</h2>

                <p>Hola {nombres}, en esta sección puedes configurar tu perfil</p>

                {loading && <p>Cargando...</p>}
                {error && <p>Error al cargar tu perfil:( </p>}

                    <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_ymGyjK60VWc89uuFt56e-mSiaPbqf4yTQ&usqp=CAU" alt="avatar" className="img-fluid rounded-circle" />
                                <h5 className="card-title">Datos personales:</h5>

                                {data &&
                                <p className="card-text">
                                    <strong>Nombres:</strong> {formState.nombres} <br />
                                    <strong>Apellidos:</strong> {formState.apellidos} <br />
                                    <strong>Identificación:</strong> {formState.identificacion} <br />
                                    <strong>Correo:</strong> {formState.correo} <br />
                                    <strong>Rol:</strong> {formState.rol} <br />
                                    <strong>Estado de tu cuenta:</strong> {formState.estado} <br />
                                </p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Cambiar datos:</h5>
                                <p>En esta sección podrás editar algunos datos básicos </p>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nombres">Nombres</label>
                                        <input type="text" className="form-control" id="nombres" value={formState.nombres} onChange={(e) => setFormState({ ...formState, nombres: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellidos">Apellidos</label>
                                        <input type="text" className="form-control" id="apellidos" value={formState.apellidos} onChange={(e) => setFormState({ ...formState, apellidos: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="identificacion">Identificación</label>
                                        <input type="text" className="form-control" id="identificacion" value={formState.identificacion} onChange={(e) => setFormState({ ...formState, identificacion: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="correo">Correo</label>
                                        <input type="text" className="form-control" id="correo"  value={formState.correo} onChange={(e) => setFormState({ ...formState, correo: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmitDatos}>Actualizar</button>
                                </form>

                                <form className="mt-3">
                                    <div className="form-group">
                                        <label htmlFor="clave1">Contraseña</label>
                                        <input type="password" className="form-control" id="clave1" value={formState.clave1} onChange={(e) => setFormState({ ...formState, clave1: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="clave2">Repetir contraseña</label>
                                        <input type="password" className="form-control" id="clave2" value={formState.clave2} onChange={(e) => setFormState({ ...formState, clave2: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmitClave}>Actualizar contraseña</button>
                                </form>


                            </div>
                        </div>
                    </div>
                                    




                </div>

               
    

            </div>
            
        </>
    )
}
