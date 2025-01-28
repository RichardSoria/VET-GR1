import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";



export const Formulario = ({corredor}) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre_corredor: corredor?.nombre_corredor ??"",
        inaguracion_corredor: corredor?.inaguracion_corredor ??"",
        integracion_alimentador: corredor?.integracion_alimentador ??"",
        integracion_corredor: corredor?.integracion_corredor ??"",  
        longitud_corredor: corredor?.longitud_corredor ??"",
        tipo_servicio: corredor?.tipo_servicio ??"",
        vehiculos: {
            trolebus: corredor?.trolebus ??"",
            biarticulados: corredor?.biarticulados ??"",
            mb0500: corredor?.mb0500 ??"",
        },
        demanda_diaria: corredor?.demanda_diaria ??"",
        tarifa: {
            normal: corredor?.normal ??"",
            reducida: corredor?.reducida ??"",
            preferencial: corredor?.preferencial ??"",
        },
        historia: corredor?.historia ??""
        
    })
    
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (paciente?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/listar')
        }
        else {
		        try {
		            const token = localStorage.getItem('token')
		            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
		            const options={
		                headers: {
		                    'Content-Type': 'application/json',
		                    Authorization: `Bearer ${token}`
		                }
		            }
		            await axios.post(url,form,options)
								setMensaje({ respuesta:"paciente registrado con exito y correo enviado", tipo: true })
		            setTimeout(() => {
		                navigate('/dashboard/listar');
		            }, 3000);
		        } catch (error) {
								setMensaje({ respuesta: error.response.data.msg, tipo: false })
		            setTimeout(() => {
		                setMensaje({})
		            }, 3000);
		        }
        }
    }


    return (
        
        <form onSubmit={handleSubmit} >
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre_corredor:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del corredor: </label>
                <input
                    id='nombre_corredor'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del corredor'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <input
                    id='propietario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del propietario'
                    name='propietario'
                    value={form.propietario}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='celular del propietario'
                    name='celular'
                    value={form.celular}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                <input
                    id='convencional'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='convencional del propietario'
                    name='convencional'
                    value={form.convencional}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <input
                    id='salida'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='salida'
                    name='salida'
                    value={form.salida}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <textarea
                    id='sintomas'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese los síntomas de la mascota'
                    name='sintomas'
                    value={form.sintomas}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar' : 'Registrar'} />

        </form>
    )
}