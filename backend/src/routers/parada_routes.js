import express from 'express';
import {
  listarParadas,
  detalleParada,
  crearParada,
  actualizarParada,
  eliminarParada
} from '../controllers/parada_controller.js';
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = express.Router();

router.get('/paradas', listarParadas);

router.get('/parada/:id', detalleParada);

router.post('/parada/registro',verificarAutenticacion, crearParada);

router.put('/parada/:id',verificarAutenticacion, actualizarParada);

router.delete('/parada/:id',verificarAutenticacion ,eliminarParada);

export default router;
