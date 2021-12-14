import {useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {LOGIN, REGISTER} from '../Apollo/gql/auth';
import { AUTH_TOKEN } from '../constants';
import React, { useState } from 'react';
import logo from '../images/LogoProjectsTable.png'
import swal from 'sweetalert';

export const Login = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    nombres: '',
    apellidos: '',
    identificacion: '',
    correo: '',
    clave: '',
    rol: ''
  });


  const [login] = useMutation(LOGIN, {
    variables: {
      correo: formState.correo,
      clave: formState.clave
    },
    onCompleted: ({ login }) => {

      if (login.token) {
        localStorage.setItem(AUTH_TOKEN, login.token);
        navigate('/');
      }else if (!login.token && login.error) {
        swal("Error", login.error, "error");
      }

    },
    onError: (error) => {
      console.log(error);
    }
  });

  const [agregarUsuarioRegister] = useMutation(REGISTER, {
    variables: {
      nombres: formState.nombres,
      apellidos: formState.apellidos,
      identificacion: formState.identificacion,
      correo: formState.correo,
      clave: formState.clave,
      rol: formState.rol
    },
    onCompleted: () => {
      swal("Exito", "¡Usuario registrado con exito! Debes la aprobación de tu cuenta por parte de un administrador", "success");
    },
    onError: (error) => {
      swal("Error", "¡Ups! No se pudo registrar el usuario", "error");
    }

  });



  const handleSubmit = (e) => {
    e.preventDefault();

    if (formState.login) {

      if (formState.correo === '' || formState.clave === '') {
        swal("Error", "¡Todos los campos son obligatorios!", "error");
      } else {
        login();
      }
  
    } else {
      if (formState.nombres === '' || formState.apellidos === '' || formState.identificacion === '' || formState.correo === '' || formState.clave === '' || formState.rol === '') {
        swal("Error", "¡Todos los campos son obligatorios!", "error");
      }else {
        agregarUsuarioRegister();
      }
     
    }
  };



  return (
    <div className='d-flex flex-column justify-content-center align-items-center container-login '>
      <img src={logo} alt='logo' className='img-fluid' />
      <h4>
        {formState.login ? 'Iniciar sesión' : 'Registrarse'}
      </h4>
      <div>
        {!formState.login && (
          <>
          <div className="form-group">
            <label htmlFor="nombres">Nombres</label>
            <input
              className="form-control"
              id = "nombres"
              value={formState.nombres}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  nombres: e.target.value
                })
              }
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              className="form-control"
              id = "apellidos"
              value={formState.apellidos}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  apellidos: e.target.value
                })
              }
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="identificacion">Identificación</label>
            <input
              className="form-control"
              id = "identificacion"
              value={formState.identificacion}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  identificacion: e.target.value
                })
              }
              type="text"
            />
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
          </>
          
  
        )}
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            className="form-control"
            id = "correo"
            value={formState.correo}
            onChange={(e) =>
              setFormState({
                ...formState,
                correo: e.target.value
              })
            }
            type="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="clave">Contraseña</label>
          <input
            className="form-control"
            id = "clave"
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                clave: e.target.value
              })
            }
            type="password"
          />
        </div>
      </div>

      <div className='mt-2'>
        <button
          className="btn btn-login"
          onClick={handleSubmit}
        >
          {formState.login ? 'Iniciar sesión' : 'Crear una cuenta'}
        </button>
        <button
          className="btn btn-login"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? '¿Necesitas una cuenta?'
            : 'Ya tengo una cuenta'}
        </button>
      </div>
    </div>
  );
};

