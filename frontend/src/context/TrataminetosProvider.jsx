import axios from "axios";
import { createContext, useState } from "react";

const tratamientosContext = createContext()

// Integrantes (children)
const TratamientosProvider = ({ children }) => {

    const [ modal, setModal ] = useState(false)
    const [tratamientos, setTratamientos] = useState([])

    const handleModal = () => {

        setModal(!modal)
    }

    const registrarTratamiento = async (data) => {


        // Tarea
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,data,options)
            console.log(respuesta.data.tratamiento);
            setTratamientos([respuesta.data.tratamiento,...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tratamientosContext.Provider value={
            {
                // Contenido del mensaje
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamiento
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )
}

export { TratamientosProvider }
export default tratamientosContext