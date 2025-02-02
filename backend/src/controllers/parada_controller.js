import Parada from '../models/Parada.js';
import mongoose from 'mongoose';
import Ruta from '../models/Ruta.js';
import Corredor from '../models/Corredor.js';

// Obtener todas las paradas
const listarParadas = async (req, res) => {
  try {
      const paradas = await Parada.find();
      res.status(200).json(paradas);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las paradas" });
    }
  };

// Obtener el detalle de una parada
const detalleParada = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `La parada con ID ${id} no existe.` });
  }

  try {
    const parada = await Parada.findById(id).populate('rutas', 'nombre')
      .populate('corredores', 'nombre');
    if (!parada) {
      return res.status(404).json({ msg: `La parada con ID ${id} no fue encontrada.` });
    }
    res.status(200).json(parada);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el detalle de la parada", error: error.message });
  }
};

// Método para crear el tratamiento
const crearParada = async (req, res) => {
  const { corredor } = req.body
  console.log(corredor)
  if (!mongoose.Types.ObjectId.isValid(corredor)) return res.status(404).json({ msg: `Lo sentimos, debe ser un id válido` });
  const parada = await Parada.create(req.body)
  res.status(200).json({ msg: `Registro exitoso del tratamiento ${parada._id}`, parada })
}


const actualizarParada = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `La parada con ID ${id} no existe.` });
  }

  const { rutas, corredores } = req.body;

  if (rutas || corredores) {
    if (rutas) {
      const rutasExistentes = await Ruta.find({ '_id': { $in: rutas } });
      if (rutasExistentes.length !== rutas.length) {
        return res.status(400).json({ msg: "Una o más rutas no existen en la base de datos." });
      }
    }

    if (corredores) {
      const corredoresExistentes = await Corredor.find({ '_id': { $in: corredores } });
      if (corredoresExistentes.length !== corredores.length) {
        return res.status(400).json({ msg: "Uno o más corredores no existen en la base de datos." });
      }
    }
  }

  try {
    const paradaActualizada = await Parada.findByIdAndUpdate(id, req.body, { new: true });
    if (!paradaActualizada) {
      return res.status(404).json({ msg: `La parada con ID ${id} no fue encontrada.` });
    }
    res.status(200).json({ msg: "Parada actualizada exitosamente.", paradaActualizada });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la parada", error: error.message });
  }
};


// Eliminar una parada
const eliminarParada = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `La parada con ID ${id} no existe.` });
  }

  try {
    const paradaEliminada = await Parada.findByIdAndUpdate(id, { estado: false }, { new: true });
    if (!paradaEliminada) {
      return res.status(404).json({ msg: `La parada con ID ${id} no fue encontrada.` });
    }
    res.status(200).json({ msg: "Parada eliminada exitosamente.", paradaEliminada });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la parada", error: error.message });
  }
};

export {
  listarParadas,
  detalleParada,
  crearParada,
  actualizarParada,
  eliminarParada,
};
