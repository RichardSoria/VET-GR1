import React, { useContext, useEffect, useState } from 'react';
import { Formulario } from '../components/Perfil/Formulario';
import Tabla from '../components/Perfil/Tabla';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { CardPerfil } from '../components/Perfil/CardPerfil';

const Perfil = () => {

    const { auth } = useContext(AuthContext)

    const [administradores, setAdministradores] = useState([])
    const [administradorSeleccionado, setAdministradorSeleccionado] = useState(null)

    const listarAdministradores = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/administradores`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAdministradores(respuesta.data, ...administradores)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarAdministradores()
    }, [])

    return (
        <>
            <div>
                {
                    auth.rol === 'Administrador'
                        ? <h1 className='font-black text-4xl text-custom-light-blue'>Datos del Usuario</h1>
                        : <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Administradores</h1>
                }
                <hr className='my-4 border-gray-400 border-t-2' />
                {
                    auth.rol === 'Administrador'
                        ? <p>Este módulo te permite visualizar los datos de tu usuario...</p>
                        : <p>Este módulo permite la gestión de los usuarios Administradores...</p>
                }
            </div>
            {
                auth.rol === 'Administrador'
                    ? (<CardPerfil />)
                    : (
                        <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                            <div className='w-full md:w-1/2'>
                                <Formulario
                                    administrador={administradorSeleccionado}
                                    listarAdministradores={listarAdministradores} />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <Tabla
                                    administradores={administradores}
                                    seleccionarAdministrador={setAdministradorSeleccionado} />
                            </div>
                        </div>
                    )
            }

        </>
    );
};

export default Perfil;
