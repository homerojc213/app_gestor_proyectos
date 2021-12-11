import {useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {LOGIN} from '../Apollo/gql/login';
import { AUTH_TOKEN } from '../constants';
import React, { useState } from 'react';
import logo from '../images/LogoProjectsTable.png'

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
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    }
  });
    

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
              <option value="" disabled>Rol al que aspiras</option>
              <option value="Administrador">Administrador</option>
              <option value="Lider">Usuario</option>
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
            type="text"
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
          onClick={login}
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

