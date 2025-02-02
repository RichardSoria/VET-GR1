import { useContext, useState } from "react";
import paradasContext from "../../context/ParadaProvider";

const ModalTratamiento = ({ idCorredor }) => {
    const { handleModal, registrarParada, setModal } = useContext(paradasContext);

    const [form, setForm] = useState({
        nombre: '',
        tipo: '',
        ubicacion: '',
        corredor: idCorredor
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registrarParada(form); // Enviar los datos correctamente
        setModal(false);
    };

    return (
        <div className="lg:w-2/4 lg:h-3/5 bg-gray-800 bg-opacity-100 top-1/4 left-1/3 fixed sticky-0 rounded-lg overflow-y-scroll">
            <p className='text-white uppercase font-bold text-lg text-center mt-4'>Tratamientos</p>
            <form className='p-10' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='nombre:' className='text-white uppercase font-bold text-sm'>Nombre: </label>
                    <input
                        id='nombre'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Nombre del tratamiento'
                        name='nombre'
                        value={form.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='tipo:' className='text-white uppercase font-bold text-sm'>Tipo: </label>
                    <input
                        id='tipo'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Tipo de tratamiento'
                        name='tipo'
                        value={form.tipo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='ubicacion:' className='text-white uppercase font-bold text-sm'>Ubicación: </label>
                    <input
                        id='ubicacion'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Ubicación del tratamiento'
                        name='ubicacion'
                        value={form.ubicacion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='text-white uppercase font-bold text-sm'>ID Corredor: </label>
                    <input
                        type="text"
                        disabled
                        value={idCorredor}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                        name='corredor'
                    />
                </div>
                <div className='flex justify-center gap-5'>
                    <input
                        type="submit"
                        className='bg-green-700 px-6 text-slate-300 rounded-lg hover:bg-green-900 cursor-pointer'
                        value='Registrar' />
                    <button className="sm:w-auto text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"
                        onClick={handleModal}
                    >Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default ModalTratamiento;
