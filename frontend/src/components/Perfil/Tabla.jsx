import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";


const Tabla = ({administradores, seleccionarAdministrador}) => {
    
    return (
        <>
            {
                administradores.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Propietario</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Celular</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                administradores.map((administradores, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={administradores._id}
                                    onClick={() => seleccionarAdministrador(administradores)}>
                                        <td>{index + 1}</td>
                                        <td>{administradores.nombre}</td>
                                        <td>{administradores.apellido}</td>
                                        <td>{administradores.email}</td>
                                        <td>{administradores.telefono}</td>
                                        
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-bold  p-2 rounded dark:bg-blue-900 dark:text-blue-300">{administradores.status && "Activo"} </span>
                                        </td>
                                        <td className='py-2 text-center'>

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                            
                                            onClick={()=>{navigate(`/dashboard/visualizar/${administradores._id}`)}}/>

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