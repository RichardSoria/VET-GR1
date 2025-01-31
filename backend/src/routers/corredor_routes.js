import { Router } from 'express';
import { listarCorredores, detalleCorredor, listarParadasDeCorredor, crearCorredor, actualizarCorredor, habilitarCorredor, deshabilitarCorredor } from "../controllers/corredor_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();


router.get("/corredores", verificarAutenticacion, listarCorredores);
router.get("/corredor/:id", detalleCorredor);
router.get("/corredor/paradas/:id", listarParadasDeCorredor);
router.post("/corredor/registro", verificarAutenticacion,crearCorredor);
router.put("/corredor/actualizar/:id", verificarAutenticacion,actualizarCorredor);
router.put("/corredor/habilitar/:id", verificarAutenticacion,habilitarCorredor);
router.put("/corredor/deshabilitar/:id", verificarAutenticacion,deshabilitarCorredor);

export default router;
