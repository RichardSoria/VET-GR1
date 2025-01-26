import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";


const Tabla = ({ administradores, seleccionarAdministrador }) => {

    const navigate = useNavigate()

    return (
        <>
            {
                administradores.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-2xl border-2 border-white'>
                        <thead className='bg-custom-light-blue text-white '>
                            <tr className='text-center'>
                                <th className='p-3'>N°</th>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Apellido</th>
                                <th className='p-3'>Email</th>
                                <th className='p-3'>Celular</th>
                                <th className='p-3'>Estado</th>
                                <th className='p-3'>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                administradores.map((administradores, index) => (
                                    <tr className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 ${administradores.status ? "bg-green-200 text-green-600 " : "bg-red-200 text-red-600"
                                    }`} key={administradores._id}
                                        onClick={() => seleccionarAdministrador(administradores)}>
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{administradores.nombre}</td>
                                        <td className="p-2 border-2 border-white">{administradores.apellido}</td>
                                        <td className="p-2 border-2 border-white">{administradores.email}</td>
                                        <td className="p-2 border-2 border-white">{administradores.telefono}</td>

                                        <td className="p-2 border-2 border-white">
                                            <span>{administradores.status ? "Activo" : "Inactivo"} </span>
                                        </td>
                                        <td className="border-2 border-white">

                                            <MdInfo className="h-7 w-7 text-custom-light-blue cursor-pointer inline-block hover:text-black"

                                                onClick={() => { navigate(`/dashboard/visualizar/${administradores._id}`) }} />

                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>

    )
}

export default Tabla