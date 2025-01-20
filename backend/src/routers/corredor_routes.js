import { Router } from 'express';
import { listarCorredores, detalleCorredor, listarParadasDeCorredor, crearCorredor, actualizarCorredor, eliminarCorredor } from "../controllers/corredor_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();


router.get("/corredores", listarCorredores);
router.get("/corredor/:id", detalleCorredor);
router.get("/corredor/paradas/:id", listarParadasDeCorredor);
router.post("/corredor/registro", verificarAutenticacion,crearCorredor);
router.put("/corredor/actualizar/:id", verificarAutenticacion,actualizarCorredor);
router.delete("/corredor/eliminar/:id", verificarAutenticacion,eliminarCorredor);

export default router;
