import mongoose from "mongoose";
import Ruta from "../models/Ruta.js"; // Importar el modelo de Rutas
import Parada from "../models/Parada.js"; // Importar el modelo de Paradas

// Método para listar todas las rutas
const listarRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find({ estado: true }) // Solo rutas activas
            .select("-createdAt -updatedAt -__v"); // Excluir campos no necesarios
        res.status(200).json(rutas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las rutas", error: error.message });
    }
};


const detalleRuta = async (req, res) => {
    const { id } = req.params;

    //Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `La ruta con ID ${id} no existe.` });
    }

    try {
        //Buscar la ruta por ID
        const ruta = await Ruta.findById(id)
            .select("-createdAt -updatedAt -__v") 
            .populate("paradas", "nombre tipo ubicacion estado");

        if (!ruta) {
            return res.status(404).json({ msg: `La ruta con ID ${id} no fue encontrada.` });
        }

        res.status(200).json(ruta);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el detalle de la ruta", error: error.message });
    }
};



const registrarRuta = async (req, res) => {
    const { nombre, paradas } = req.body;

    // Verificar que todos los campos sean enviados
    if (Object.values(req.body).some((campo) => !campo)) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios." });
    }

    try {
        // Verificar si la ruta ya existe
        const rutaExistente = await Ruta.findOne({ nombre });
        if (rutaExistente) {
            return res.status(400).json({ msg: "La ruta con este nombre ya se encuentra registrada." });
        }


        // Verificar que las paradas existen
        const paradasExistentes = await Parada.find({ _id: { $in: paradas } });
        if (!paradasExistentes) {
            return res.status(400).json({
                msg: "Algunas de las paradas enviadas no existen en la base de datos.",
            });
        }

        // Crear y guardar la nueva ruta
        const nuevaRuta = new Ruta(req.body);
        await nuevaRuta.save();
        res.status(201).json({ msg: "Ruta registrada exitosamente.", nuevaRuta });
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar la ruta", error: error.message });
    }
};



const actualizarRuta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `La ruta con ID ${id} no existe.` });
    }

    if (Object.values(req.body).some((campo) => !campo)) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios." });
    }

    try {
        const rutaActualizada = await Ruta.findByIdAndUpdate(id, req.body, { new: true });
        if (!rutaActualizada) {
            return res.status(404).json({ msg: `La ruta con ID ${id} no fue encontrada.` });
        }
        res.status(200).json({ msg: "Ruta actualizada exitosamente.", rutaActualizada });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la ruta", error: error.message });
    }
};

const eliminarRuta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `La ruta con ID ${id} no existe.` });
    }

    try {
        const rutaEliminada = await Ruta.findByIdAndUpdate(id, { estado: false }, { new: true });
        if (!rutaEliminada) {
            return res.status(404).json({ msg: `La ruta con ID ${id} no fue encontrada.` });
        }
        res.status(200).json({ msg: "Ruta eliminada exitosamente.", rutaEliminada });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la ruta", error: error.message });
    }
};


const listarRutasPorCorredor = async (req, res) => {
    const { corredorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(corredorId)) {
        return res.status(404).json({ msg: `El corredor con ID ${corredorId} no existe.` });
    }

    try {
        const rutas = await Ruta.find({ corredor: corredorId, estado: true })
            .select("-createdAt -updatedAt -__v"); 

        if (!rutas.length) {
            return res.status(404).json({ msg: "No se encontraron rutas para este corredor." });
        }

        res.status(200).json(rutas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las rutas del corredor", error: error.message });
    }
};

// Listar las paradas de una ruta
const listarParadasDeRuta = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `La ruta con ID ${id} no existe.` });
    }

    try {
        // Buscar la ruta por ID
        const ruta = await Ruta.findById(id).populate("paradas", "nombre tipo ubicacion estado");

        if (!ruta) {
            return res.status(404).json({ msg: `La ruta con ID ${id} no fue encontrada.` });
        }

        // Si la ruta existe, se devuelve la lista de paradas asociadas
        res.status(200).json(ruta.paradas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las paradas de la ruta", error: error.message });
    }
};




export {
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta,
    listarRutasPorCorredor,
    listarParadasDeRuta
};

