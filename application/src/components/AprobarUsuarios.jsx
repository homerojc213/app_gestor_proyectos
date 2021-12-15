import React  from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_USUARIOS from '../Apollo/gql/getUsuarios';
import { Navigation } from './Navigation'
import { APROBARUSUARIO } from '../Apollo/gql/aprobarUsuario';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';

export const AprobarUsuarios = () => {

    const { loading, error, data } = useQuery(GET_USUARIOS);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        if (data) {
            setUsuarios(data.Usuarios);
        }
    } , [data]);
       
    let usuariosPorAprobar = usuarios.filter(usuario => (usuario.estado === 'Pendiente')) || [];


    const [aprobarUsuario] = useMutation(APROBARUSUARIO);

    const handleAprobarUsuario = async (id) => {

        await aprobarUsuario({
            variables: {
                id: id
            },
            onCompleted: () => {
                swal("Usuario Aprobado", "El usuario ha sido aprobado", "success");
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            },
            onError: () => {
                swal("Error", "El usuario no ha podido ser aprobado", "error");
            }
        });

    }

    return (
        <>
            
            <Navigation />
            <div className="container text-center">
                <div className="row mt-5">
                    <h4>Usuarios pendientes por aprobación</h4>

                        {loading && <p>Cargando...</p>}
                        {error && <p>Error al cargar los usuarios :( </p>}

                        {usuariosPorAprobar.length === 0 && <><p>No hay usuarios pendientes por aprobar</p></>}
                        {usuariosPorAprobar.length > 0 && 
                            usuariosPorAprobar.map(usuario => (
                                <div className="col-md-3" key={usuario.id}>
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h5>{}</h5>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_ymGyjK60VWc89uuFt56e-mSiaPbqf4yTQ&usqp=CAU" alt="imagen" className="img-fluid" />
                                        </div>
                                        <div className="card-body">
                                        <tr>Id: {usuario.id}</tr>
                                        <tr>Nombre: {usuario.nombres} {usuario.apellidos}</tr>
                                        <tr>Identificacion: {usuario.identificacion}</tr>
                                        <tr>Email: {usuario.correo}</tr>
                                        <tr>Rol: {usuario.rol}</tr>
                                        <tr>Estado: {usuario.estado}</tr>
                                         
                                        </div>
                                        
                                        <div className="card-footer">
                                        <button className="btn btn-primary m-1" onClick={() => 

                                            handleAprobarUsuario(usuario.id)}>Aprobar</button>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
            
        </>
    );
}
