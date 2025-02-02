import { useContext } from "react";
import { MdInfo } from "react-icons/md";

import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import ParadasContext from "../../context/ParadaProvider";


const TablaParada = () => {

    const { paradas, setParadas } = useContext(ParadasContext)
    const navigate = useNavigate()

    return (
        <>
            {
                
                paradas.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <div className="overflow-x-auto">
                        <table className="min-w-full mt-5 table-auto shadow-2xl border-2 border-white">
                            <thead className="bg-custom-blue text-white">
                                <tr className="text-center">
                                    <th className="p-3">N°</th>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Tipo</th>
                                    <th className="p-3">Ubicación</th>
                                    <th className="p-3">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paradas.map((parada, index) => (
                                    <tr
                                        key={parada._id}
                                        className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 ${parada.status ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}
                                    >
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{parada.nombre}</td>
                                        <td className="p-2 border-2 border-white">{parada.tipo}</td>
                                        <td className="p-2 border-2 border-white">{parada.ubicacion}</td>
                                        <td className="p-2 border-2 border-white">
                                            <span>{parada.status ? "Activo" : "Inactivo"}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            }
        </>

    )
}

export default TablaParada