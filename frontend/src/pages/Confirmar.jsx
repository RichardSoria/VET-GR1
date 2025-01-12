import logoDog from '../assets/Independence-Square-66230.jpg'
import { Link, useParams } from 'react-router-dom'
import Mensaje from '../components/Alertas/Mensaje'

import axios from 'axios'

import { useEffect, useState } from 'react'

export const Confirmar = () => {

    const {token} = useParams()
    const [mensaje, setMensaje] = useState("")

    const verificarToken = async () => {
        try {
            const url = `http://localhost:3000/api/confirmar/${token}`
            const respuesta = await axios.get(url)
            setMensaje({respuesta:respuesta.data.msg,tipo:false})
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:true})
        }
    }

    useEffect(() => {
        verificarToken()
    }, [])


    return ( 
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <img className="w-96 mx-auto m-4" src="/public/images/logo_quito_transporte.png" />
            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-custom-blue" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-600 m-4">Muchas Gracias</p>
                <p className="md:text-lg lg:text-xl text-gray-500 m-2">Ya puedes iniciar sesión</p>
                <Link to="/login" className="py-2 w-full m-5 block text-center bg-custom-blue text-white font-bold text-lg rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Iniciar Sesión</Link>
            </div>

        </div>
    )
}
