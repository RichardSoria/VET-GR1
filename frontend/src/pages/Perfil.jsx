import React, { useEffect, useState } from 'react';
import { Formulario } from '../components/Perfil/Formulario';
import Tabla from '../components/Perfil/Tabla';
import axios from 'axios';

const Perfil = () => {

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
                <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Administradores</h1>
                <hr className='my-4 border-gray-400 border-t-2' />
                <p>Este módulo permite la gestión de los usuarios Administradores...</p>
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className='w-full md:w-1/2'>
                    {/* Pasa listarAdministradores como prop */}
                    <Formulario 
                    administrador={administradorSeleccionado}
                    listarAdministradores={listarAdministradores} />
                </div>
                <div className='w-full md:w-1/2'>
                    {/* Pasa la lista actualizada de administradores */}
                    <Tabla 
                    administradores={administradores} 
                    seleccionarAdministrador={setAdministradorSeleccionado}/>
                </div>
            </div>
        </>
    );
};

export default Perfil;
