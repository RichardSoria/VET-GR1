import axios from "axios"
import { createContext, useEffect, useState } from "react"

const CorredorContext = createContext()

const CorredorProvider = ({ children }) => {

    const [corredores, setCorredores] = useState([])
    const [corredorSeleccionado, setCorredorSeleccionado] = useState(null)

    const listarCorredores = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/corredores`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setCorredores(respuesta.data, ...corredores)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            listarCorredores()
        }
    }, [])


    return (
        <CorredorContext.Provider value={
            {
                listarCorredores,
                corredores,
                setCorredores,
                corredorSeleccionado,
                setCorredorSeleccionado
            }
        }>
            {children}
        </CorredorContext.Provider>
    )
}
export {
    CorredorProvider
}
export default CorredorContext