import { useState } from 'react'
import { Link } from 'react-router-dom'

import ImagenLogo from '../../public/images/logo_quito_transporte.png'
import ImagenArticulado from '../../public/images/20201119_083024.jpg'

import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'
import Mensaje from '../components/Alertas/Mensaje'

export const Register = () => {

    // Paso 1
    // Crear un estado para el formulario
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
        password: ""
    })

    const [mensaje, setMensaje] = useState({})

    // Paso 2
    // Crear una función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    // Paso 3
    const handleSubnit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
            setForm({})
        } catch (error) {
            console.log(error)
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }

    }

    return (
        <>
            <div className="w-1/2 h-screen flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <img className="w-96 mx-auto flex justify-center items-center" src={ImagenLogo} />
                    <small className="text-gray-600 block my-4 text-lg">Para registrar una cuenta, ingrese sus datos personales</small>

                    <form onSubmit={handleSubnit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="direccion">Dirección</label>
                            <input type="text" id="direccion" name='direccion'
                                value={form.direccion || ""} onChange={handleChange}
                                placeholder="Ingresa tu dirección" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="telefono">Teléfono:</label>
                            <input type="tel" id="telefono" name='telefono'
                                value={form.telefono || ""} onChange={handleChange}
                                placeholder="Ingresa tu teléfono" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="email">Email:</label>
                            <input type="email" id="email" name='email'
                                value={form.email || ""} onChange={handleChange}
                                placeholder="Ingresa tu email" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold" htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name='password'
                                value={form.password || ""} onChange={handleChange}
                                placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"  />
                        </div>

                        <div className="mb-3">
                            <button className="py-2 w-full block text-center bg-custom-blue text-white font-bold text-lg rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 border-gray-400">
                    </div>

                    <div className="mt-3 text-base font-semibold flex justify-between items-center">
                        <p>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="py-2 px-2 bg-custom-yellow text-lg border rounded-xl hover:scale-105 duration-300 hover:bg-custom-red hover:text-white">Iniciar Sesión</Link>
                    </div>


                </div>

            </div>

            <div className="w-1/2 h-screen 
            bg-no-repeat bg-cover bg-center sm:block hidden border-l-8 border-custom-blue"
                style={{ backgroundImage: `url(${ImagenArticulado})` }}>
                <div className="h-screen justify-bottom items-end flex">
                    <img src="/public/images/FRANJA_TRAMA_02.png" />
                </div>
            </div>
        </>
    )
}
