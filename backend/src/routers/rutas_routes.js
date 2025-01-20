import { Router } from 'express';
const router = Router();

import {
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta,
    listarRutasPorCorredor,
    listarParadasDeRuta,
} from "../controllers/ruta_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";



router.get("/rutas",  listarRutas);
router.get("/ruta/:id",  detalleRuta);
router.post("/ruta/registro", verificarAutenticacion, registrarRuta);
router.put("/ruta/actualizar/:id", verificarAutenticacion, actualizarRuta);
router.delete("/ruta/eliminar/:id", verificarAutenticacion, eliminarRuta);
router.get("corredor/rutas/:corredorId", listarRutasPorCorredor);
router.get("/ruta/paradas/:id", listarParadasDeRuta);

export default router;
