import React from 'react'
import { Formulario } from '../components/Formulario'

const Crear = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-custom-blue'>Gestionar Corredores...</h1>
            <hr className='my-4 border-gray-400 border-t-2'/>
            <p className='mb-8'>Este módulo permite la gestión de los Corredores.....</p>
            <Formulario />
        </div>
    )
}

export default Crear