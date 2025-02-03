import { Navigate, useParams } from 'react-router-dom';
import { use, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AdministradorProvider';
import { useLocation } from 'react-router-dom';
import TablaParada from '../components/Parada/TablaParada';
import TablaRuta from '../components/Ruta/TablaRuta';
import ParadasContext from '../context/ParadaProvider';
import { FormularioParada } from '../components/Parada/FormularioParada';

const VisualizarCorredor = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [corredor, setCorredor] = useState({});

    useEffect(() => {

        const consultarCorredor = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/corredor/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setCorredor(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarCorredor();

    }, []);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Visualizar Corredor {corredor.nombre_corredor}</h1>
                <hr className='my-5 border-slate-500 border-t-2' />
                <p>Este submódulo te permite visualizar los datos del Corredor y gestionar sus paradas y rutas...</p>
            </div>
            <div className="my-5">
                <div className="">
                    <div className="p-5 shadow-2xl bg-slate-50 bg-opacity-50">
                    <TablaParada />
                        
                    </div>
                    <div className="p-4 shadow-2xl bg-slate-50 bg-opacity-50">
                        
                        <FormularioParada />
                    </div>
                    <div className="p-5 shadow-2xl bg-slate-50 bg-opacity-50">

                    </div>
                    <div className="p-5 shadow-2xl bg-slate-50 bg-opacity-50">
                        <TablaRuta />
                    </div>
                </div>
            </div>
            <hr className='my-4 border-slate-500 border-t-2' />
            <div className='flex justify-center'>
                <button
                    className='text-black font-bold bg-custom-yellow p-3 rounded-md text-center text-xl hover:bg-custom-red hover:text-white'
                    onClick={() => navigate("/dashboard/gestionar-corredor")}
                >
                    Regresar a la Gestión de Corredores
                </button>
            </div>
        </>
    );
};

export default VisualizarCorredor;
