import Corredor from "../models/Corredor.js";
import mongoose from "mongoose";

// Listar todos los corredores
const listarCorredores = async (req, res) => {
  try {
    const corredores = await Corredor.find();
    res.status(200).json(corredores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los corredores" });
  }
};

// Obtener los detalles de un corredor específico
const detalleCorredor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `El corredor con ID ${id} no existe.` });
  }

  try {
    const corredor = await Corredor.findById(id);
    if (!corredor) {
      return res.status(404).json({ message: "Corredor no encontrado" });
    }
    res.status(200).json(corredor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los detalles del corredor" });
  }
};

// Listar todas las paradas de un corredor
const listarParadasDeCorredor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `El corredor con ID ${id} no existe.` });
  }

  try {
    const corredor = await Corredor.findById(id).populate("paradas", "nombre tipo ubicacion estado");

    if (!corredor) {
      return res.status(404).json({ msg: `El corredor con ID ${id} no fue encontrado.` });
    }

    res.status(200).json(corredor.paradas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las paradas del corredor", error: error.message });
  }
};

// Crear un nuevo corredor
const crearCorredor = async (req, res) => {
  const { nombre_corredor } = req.body;

  
  if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    

  try {
    
    const corredorExistente = await Corredor.findOne({ nombre_corredor: nombre_corredor.trim() });

    if (corredorExistente) {
      return res.status(400).json({ msg: `El corredor con el nombre "${nombre_corredor}" ya existe.` });
    }

    
    const nuevoCorredor = new Corredor(req.body);
    await nuevoCorredor.save();

    res.status(201).json({ msg: "Corredor creado exitosamente.", nuevoCorredor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el corredor", error: error.message });
  }
};


// Actualizar un corredor existente
const actualizarCorredor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `El corredor con ID ${id} no existe.` });
  }

  if (Object.values(req.body).some((campo) => !campo)) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios." });
  }

  try {
    const corredorActualizado = await Corredor.findByIdAndUpdate(id, req.body, { new: true });
    if (!corredorActualizado) {
      return res.status(404).json({ msg: `El corredor con ID ${id} no fue encontrado.` });
    }
    res.status(200).json({ msg: "Corredor actualizado exitosamente.", corredorActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el corredor", error: error.message });
  }
};

// Eliminar un corredor 
const eliminarCorredor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `El corredor con ID ${id} no existe.` });
  }

  try {
    const corredorEliminado = await Corredor.findByIdAndDelete(id);
    if (!corredorEliminado) {
      return res.status(404).json({ msg: `El corredor con ID ${id} no fue encontrado.` });
    }
    res.status(200).json({ msg: "Corredor eliminado exitosamente.", corredorEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el corredor", error: error.message });
  }
};

export {
  listarCorredores,
  detalleCorredor,
  listarParadasDeCorredor,
  crearCorredor,
  actualizarCorredor,
  eliminarCorredor,
};
