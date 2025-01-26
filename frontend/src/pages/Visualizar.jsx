import { Navigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alertas/Mensaje';
import { useNavigate } from "react-router-dom";
import ModalTratamiento from '../components/Modals/ModalTratamiento';
import TratamientosContext from '../context/TrataminetosProvider';
import AuthContext from '../context/AuthProvider';
import TablaTratamientos from '../components/TablaTramientos';

const Visualizar = () => {

    const { auth } = useContext(AuthContext)

    const { modal, handleModal, tratamientos, setTratamientos } = useContext(TratamientosContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [administrador, setadministrador] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultaradministrador = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)

                setadministrador(respuesta.data)

            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultaradministrador()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Visualizar administrador</h1>
                <hr className='my-4 border-slate-500 border-t-2' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del administrador</p>
                
            </div>
            <div>
                <>
                
                    <div className='m-5 flex justify-between'>
                        <div>
                            <p className="text-md mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Nombre del Administrador: </span>
                                {administrador.nombre}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Apellido del Administrador: </span>
                                {administrador.apellido}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Email del Administrador: </span>
                                {administrador.email}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Teléfono del Administrador: </span>
                                {administrador.telefono}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Dirección del Administrador: </span>
                                {administrador.direccion}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Fecha de creación del Usuario: </span>
                                {administrador.createdAt}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Fecha de ultimá actualización del Usuario: </span>
                                {administrador.updatedAt}
                            </p>
                        </div>
                        <div>
                            <img src="https://www.quito.gob.ec/wp-content/uploads/2024/01/LOGO_ALCALDIA_QUITO-23.svg"  className='h-80 w-80' />
                        </div>
                    </div>
                    <hr className='my-4 border-slate-500 border-t-2' />
                    <div className='flex justify-center'>
                        <button className='text-black font-bold bg-custom-yellow p-3 rounded-md text-center text-xl item hover:bg-custom-red hover:text-white' onClick={() => navigate("/dashboard/")}>Regresar a la Gestión de Administradores</button>
                    </div>
                </>
            </div>
        </>

    )
}

export default Visualizar