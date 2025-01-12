import logoDog from '../assets/27985414566_db261f5873_b.jpg'
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


export default function Restablecer() {
    const{ token } = useParams()
    const [ tokenback, setTokenBack ] = useState(false)

    const [ form, setForm ] = useState({
        password: "",
        confirmpassword: ""
    })

    // Paso 2
    // Crear una función para manejar los cambios en el formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setTokenBack(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])
    
    // Paso 3
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            setForm({})
            toast.success(respuesta.data.msg)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center">
        <ToastContainer />
        <img className="w-96 mx-auto" src="/public/images/logo_quito_transporte.png" />
                  <h1 className="text-3xl font-semibold mt- mb-2 text-center uppercase  text-gray-500">Restablecer Contraseña</h1>
            <small className="text-gray-400 block mb-3 text-lg">Crea una nueva contraseña</small>
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-custom-blue" src={logoDog} alt="image description" />
            {tokenback &&
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className="mb-2 mt-2 block text-base font-semibold">Contraseña</label>
                        <input type="password" placeholder="Ingresa tu nueva contraseña" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"
                            value={form.password || ""}
                            name='password'
                            onChange={handleChange}
                        />
                        <label className="mb-2 mt-2 block text-base font-semibold">Confirmar Contraseña</label>
                        <input type="password" placeholder="Confirma tu nueva contraseña" className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500"
                            value={form.confirmpassword || ""}
                            name='confirmpassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <button className="py-2 w-full block mt-4 text-center bg-custom-blue text-white font-bold text-lg rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Restablecer Contraseña
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}