import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ParadasContext = createContext()

// Integrantes (children)
const ParadasProvider = ({ children }) => {

    const location = useLocation()

    const [modal, setModal] = useState(false)
    const [paradas, setParadas] = useState([])

    const handleModal = () => {

        setModal(!modal)
    }

    const listarParadas = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paradas`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setParadas(respuesta.data, ...paradas)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            listarParadas();
        }
    }, [location.pathname]);

    const registrarParada = async (data) => {
        // Tarea
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/parada/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, data, options)
            console.log(respuesta.data)
            listarParadas()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ParadasContext.Provider value={
            {
                // Contenido del mensaje
                modal,
                setModal,
                handleModal,
                paradas,
                setParadas,
                registrarParada,
                listarParadas
            }
        }>
            {children}
        </ParadasContext.Provider>
    )
}

export { ParadasProvider }
export default ParadasContext