// Importar Router de Express
import {Router} from 'express'

// Crear una instancia de Router() 
const router = Router()

// Importar los métodos del controlador 
import {
    login,
    perfil,
    registro,
    confirmEmail,
    listarAdministradores,
    detalleAdministrador,
    actualizarPerfil,
    eliminarAdministrador,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
} from "../controllers/admin_controller.js";
import verificarAutenticacion from '../middlewares/autenticacion.js';


import { validacionAdministrador } from '../middlewares/validacionAdministrador.js';


// Rutas publicas
router.post("/login", login);



router.post("/registro", /*validacionAdministrador,*/ registro);


router.get("/confirmar/:token", confirmEmail);
router.get("/administradores", listarAdministradores);
router.post("/recuperar-password", recuperarPassword);
router.get("/recuperar-password/:token", comprobarTokenPasword);
router.post("/nuevo-password/:token", nuevoPassword);



// Rutas privadas
router.get("/perfil",verificarAutenticacion , perfil,);



router.put('/administrador/actualizarpassword',verificarAutenticacion, actualizarPassword)



router.get("/administrador/:id", verificarAutenticacion, detalleAdministrador);



router.put("/administrador/:id", verificarAutenticacion, actualizarPerfil);

router.delete("/administrador/:id", verificarAutenticacion, eliminarAdministrador);





// Exportar la variable router
export default router






