import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserPen, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';


export const FormularioCorredor = ({ corredor }) => {

    const navigate = useNavigate()

    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre_corredor: corredor?.nombre_corredor ?? "",
        inaguracion_corredor: corredor?.inaguracion_corredor
            ? new Date(corredor.inaguracion_corredor).toLocaleDateString('en-CA', { timeZone: 'UTC' })
            : "",
        integracion_alimentador: corredor?.integracion_alimentador ?? "",
        integracion_corredor: corredor?.integracion_corredor ?? "",
        longitud_corredor: corredor?.longitud_corredor ?? "",
        tipo_servicio: corredor?.tipo_servicio ?? "",
        vehiculos: {
            trolebus: corredor?.vehiculos?.trolebus ?? "",
            biarticulados: corredor?.vehiculos?.biarticulados ?? "",
            mb0500: corredor?.vehiculos?.mb0500 ?? "",
        },
        demanda_diaria: corredor?.demanda_diaria ?? "",
        tarifa: {
            normal: corredor?.tarifa?.normal ?? "",
            reducida: corredor?.tarifa?.reducida ?? "",
            preferencial: corredor?.tarifa?.preferencial ?? "",
        },
        historia: corredor?.historia ?? ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Manejo especial para objetos anidados (vehiculos y tarifa)
        if (name in form.vehiculos) {
            setform(prevState => ({
                ...prevState,
                vehiculos: {
                    ...prevState.vehiculos,
                    [name]: value === "" ? 0 : Number(value)  // Asegurar que sea número
                }
            }));
        } else if (name in form.tarifa) {
            setform(prevState => ({
                ...prevState,
                tarifa: {
                    ...prevState.tarifa,
                    [name]: value === "" ? 0 : Number(value)  // Asegurar que sea número
                }
            }));
        } else {
            setform({
                ...form,
                [name]: value
            });
        }
    }

    const resetForm = () => {
        setform({
            nombre_corredor: "",
            inaguracion_corredor: "",
            integracion_alimentador: "",
            integracion_corredor: "",
            longitud_corredor: "",
            tipo_servicio: "",
            vehiculos: {
                trolebus: "",
                biarticulados: "",
                mb0500: "",
            },
            demanda_diaria: "",
            tarifa: {
                normal: "",
                reducida: "",
                preferencial: "",
            },
            historia: ""
        })
    }

    const handleAgregar = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/corredor/registro`;
    
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
    
            // Asegurar valores válidos antes de enviar
            const formCrear = {
                ...form,
                tarifa: {
                    normal: form.tarifa.normal ?? "",
                    reducida: form.tarifa.reducida ?? "",
                    preferencial: form.tarifa.preferencial ?? "",
                },
                vehiculos: {
                    trolebus: form.vehiculos.trolebus ?? "",
                    biarticulados: form.vehiculos.biarticulados ?? "",
                    mb0500: form.vehiculos.mb0500 ?? "",
                }
            };

            delete formCrear._id;  // Eliminar _id si existe (actualización)
        
            await axios.post(url, formCrear, options);
            resetForm();
            setMensaje({ respuesta: "Usuario administrador registrado con éxito.", tipo: true });
            setTimeout(() => setMensaje({}), 3000);
            
        } catch (error) {
            console.error(error);
            setMensaje({ respuesta: error.response?.data?.msg || "Error en el registro.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    }

    return (

        <form className='shadow-2xl rounded-lg p-10'>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre_corredor'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del corredor: </label>
                <input
                    id='nombre_corredor'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del corredor'
                    name='nombre_corredor'
                    value={form.nombre_corredor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='inaguracion_corredor'
                    className='text-gray-700 uppercase font-bold text-sm'>Inaguración del corredor: </label>
                <input
                    id='inaguracion_corredor'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Inaguración del corredor'
                    name='inaguracion_corredor'
                    value={form.inaguracion_corredor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='integracion_alimentador'
                    className='text-gray-700 uppercase font-bold text-sm'>Integración con alimentaroes:</label>
                <input
                    id='integracion_alimentador'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Integración con alimentaroes'
                    name='integracion_alimentador'
                    value={form.integracion_alimentador}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='integracion_corredor'
                    className='text-gray-700 uppercase font-bold text-sm'>Integración entre corredores:</label>
                <input
                    id='integracion_corredor'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Integración entre corredores'
                    name='integracion_corredor'
                    value={form.integracion_corredor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='longitud_corredor:'
                    className='text-gray-700 uppercase font-bold text-sm'>Longitud del corredor:</label>
                <input
                    id='longitud_corredor'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Longitud del corredor'
                    name='longitud_corredor'
                    value={form.longitud_corredor}
                    onChange={handleChange}
                />
                <div>
                    <label
                        htmlFor='tipo_servicio'
                        className='text-gray-700 uppercase font-bold text-sm'>Tipo de servicio:</label>
                    <input
                        id='tipo_servicio'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Tipo de servicio'
                        name='tipo_servicio'
                        value={form.tipo_servicio}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor='vehiculos'
                        className='text-gray-700 uppercase font-bold text-sm'>Cantidad de vehículos:</label>
                    <br />
                    <br />
                    <label
                        htmlFor='trolebus'
                        className='text-gray-700 uppercase font-bold text-sm'>Cantidad de unidades de Trolebús:</label>
                    <input
                        id="trolebus"
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Cantidad de unidades de Trolebús'
                        name='trolebus'
                        value={form.vehiculos.trolebus}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='biarticulados'
                        className='text-gray-700 uppercase font-bold text-sm'>Cantidad de unidades de Biarticulados:</label>
                    <input
                        id='biarticulados'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Cantidad de unidades de Biarticulados'
                        name='biarticulados'
                        value={form.vehiculos.biarticulados}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='mb0500'
                        className='text-gray-700 uppercase font-bold text-sm'>Cantidad de unidades de MB0500:</label>
                    <input
                        id='mb0500'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Cantidad de unidades de MB0500'
                        name='mb0500'
                        value={form.vehiculos.mb0500}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='demanda_diaria'
                        className='text-gray-700 uppercase font-bold text-sm'>Demanda diaria:</label>
                    <input
                        id='demanda_diaria'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Demanda diaria'
                        name='demanda_diaria'
                        value={form.demanda_diaria}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='tarifa'
                        className='text-gray-700 uppercase font-bold text-sm'>Tarifa:</label>
                    <br />
                    <br />
                    <label
                        htmlFor='normal'
                        className='text-gray-700 uppercase font-bold text-sm'>Tarifa normal:</label>
                    <input
                        id='normal'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Tarifa normal'
                        name='normal'
                        value={form.tarifa.normal}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='reducida'
                        className='text-gray-700 uppercase font-bold text-sm'>Tarifa reducida:</label>
                    <input
                        id='reducida'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Tarifa reducida'
                        name='reducida'
                        value={form.tarifa.reducida}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='preferencial'
                        className='text-gray-700 uppercase font-bold text-sm'>Tarifa preferencial:</label>
                    <input
                        id='preferencial'
                        type="number"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Tarifa preferencial'
                        name='preferencial'
                        value={form.tarifa.preferencial}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor='historia'
                        className='text-gray-700 uppercase font-bold text-sm'>Historia:</label>
                    <textarea
                        id='historia'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Historia'
                        name='historia'
                        value={form.historia}
                        onChange={handleChange}
                    />


                </div>
            </div>


            <div className='flex justify-between gap-4'>

                <button className="bg-custom-light-blue w-full p-3 text-white  font-bold rounded-lg 
                                hover:bg-custom-red cursor-pointer transition-all flex items-center justify-center gap-2"
                    onClick={handleAgregar}>
                    <FontAwesomeIcon icon={faUserPlus} />
                    Agregar Usuario
                </button>
            </div>
        </form>
    )
}