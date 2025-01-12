import {Link} from 'react-router-dom'
import { useState } from 'react'
import Mensaje from '../components/Alertas/Mensaje'
import axios from 'axios'



export const Forgot = () => {
    // Paso 1
    // Crear un estado para el formulario
    const [email, setEmail] = useState({
        email: "",
    })

    const [mensaje, setMensaje] = useState({})

    // Paso 2
    // Crear una función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        })
    }

    // Paso 3
    const handleSubnit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:3000/api/recuperar-password"
            const respuesta = await axios.post(url, email)
            setMensaje({respuesta:respuesta.data.msg,tipo:true})
            setEmail({})
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:false})
        }
    }

    return (
        <>
            <div className="flex justify-center items-center w-1/2">

                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                    <img className="w-96 mx-auto" src="/public/images/logo_quito_transporte.png" />
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500 text-justify">¡Olvidaste tu contraseña!</h1>
                    <small className="text-gray-400 block my-4 text-lg">No te preocupes, ingresa tu correo electrónico</small>


                    <form onSubmit={handleSubnit}>

                        <div className="mb-1">
                            <label className="mb-2 block text-base font-semibold">Correo Electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo electrónico" 
                            className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"
                            name='email'
                            onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <button className="py-2 w-full mt-4 block text-center bg-custom-blue text-white font-bold text-lg rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Enviar correo
                            </button>
                        </div>

                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 border-gray-400">
                    </div>

                    <div className="mt-3 text-sm font-semibold flex justify-between items-center">
                        <p>¿Haz recordado tu contraseña?</p>
                        <Link to="/login" className="py-2 px-5 bg-custom-yellow text-lg border rounded-xl hover:scale-110 duration-300 hover:bg-custom-red hover:text-white">Iniciar Sesión</Link>

                    </div>

                </div>

            </div>

            <div className="w-1/2 h-screen bg-[url('/public/images/Mitad_del_Mundo_Quito_Ecuador_2015-07-22_DD_03-2.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden border-l-8 border-custom-blue">
                <div className="h-screen justify-bottom items-end flex">
                    <img src="/public/images/FRANJA_TRAMA_02.png" />
                </div>
            </div>
        </>
    )
}
