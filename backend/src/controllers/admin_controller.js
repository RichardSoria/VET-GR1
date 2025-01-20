
// Importar el modelo 
import { sendMailToUser, sendMailToRecoveryPassword } from "../config/nodemailer.js"
import generarJWT from "../helpers/crearJWT.js"
import Administrador from "../models/Admin.js"
import mongoose from "mongoose";



// Método para el login
const login = async(req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const administradorBDD = await Administrador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    
    if(administradorBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    
    if(!administradorBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    
    const verificarPassword = await administradorBDD.matchPassword(password)
    
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    

    const token = generarJWT(administradorBDD._id,"administrador")

    const {nombre,apellido,direccion,telefono,_id} = administradorBDD
    
    res.status(200).json({
        token,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:administradorBDD.email
    })
}




// Método para mostrar el perfil 
const perfil =(req,res)=>{
    delete req.administradorBDD.token
    delete req.administradorBDD.confirmEmail
    delete req.administradorBDD.createdAt
    delete req.administradorBDD.updatedAt
    delete req.administradorBDD.changePassword
    delete req.administradorBDD.__v
    res.status(200).json(req.administradorBDD)
}






// Método para el registro
const registro = async (req,res)=>{
    // Desestructurar los campos 
    const {email} = req.body
    // Validar todos los campos llenos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Obtener el usuario de la BDD en base al email
    const verificarEmailBDD = await Administrador.findOne({email})
    // Validar que el email sea nuevo
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    // Crear la instancia del Administrador
    const nuevoAdministrador = new Administrador(req.body)
    
    // Crear un password
    const password = Math.random().toString(36).substring(2)

    // Encriptar el password
    nuevoAdministrador.password = await nuevoAdministrador.encrypPassword("Admin"+password+"Quito")

    //Crear el token 
    const token = nuevoAdministrador.crearToken()

    // Enviar el correo electrónico
    await sendMailToUser(email,"Admin"+password+"Quito")
    // Guaradar en BDD
    await nuevoAdministrador.save()
    // Imprimir el mensaje
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}




// Método para confirmar el token
const confirmEmail = async(req,res)=>{

    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})

    const administradorBDD = await Administrador.findOne({token:req.params.token})

    if(!administradorBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    
    
    administradorBDD.token = null

    administradorBDD.confirmEmail=true

    await administradorBDD.save()

    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}


// Método para listar Administradors
const listarAdministradores = async (req,res)=>{
    const administradores = await Administrador.find({status:true})
    res.status(200).json(administradores)
}




// Método para mostrar el detalle de un Administrador en particular
const detalleAdministrador = async(req,res)=>{
    const {id} = req.params
    const administradorBDD = await Administrador.findById(id)
    res.status(200).json(administradorBDD)
}










// Método para actualizar el perfil
const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const administradorBDD = await Administrador.findById(id)
    if(!administradorBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Administrador ${id}`})
    if (administradorBDD.email !=  req.body.email)
    {
        const administradorBDDMail = await Administrador.findOne({email:req.body.email})
        if (administradorBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
	
    administradorBDD.nombre = req.body.nombre || administradorBDD?.nombre
    administradorBDD.apellido = req.body.apellido  || administradorBDD?.apellido
    administradorBDD.direccion = req.body.direccion ||  administradorBDD?.direccion
    administradorBDD.telefono = req.body.telefono || administradorBDD?.telefono
    administradorBDD.email = req.body.email || administradorBDD?.email
    await administradorBDD.save()
    res.status(200).json({msg:"Perfil actualizado correctamente"})
}






// Método para actualizar el password
const actualizarPassword = async (req,res)=>{
    const administradorBDD = await Administrador.findById(req.administradorBDD._id)
    if(!administradorBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Administrador ${id}`})
    const verificarPassword = await administradorBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    administradorBDD.password = await administradorBDD.encrypPassword(req.body.passwordnuevo)
    await administradorBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}

const eliminarAdministrador = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const administradorBDD = await Administrador.findById(id)
    if(!administradorBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Administrador ${id}`})
    administradorBDD.status = false
    await administradorBDD.save()
    res.status(200).json({msg:"Administrador eliminado correctamente"})
}



// Método para recuperar el password
const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const administradorBDD = await Administrador.findOne({email})
    if(!administradorBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = administradorBDD.crearToken()
    administradorBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await administradorBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}







// Método para comprobar el token
const comprobarTokenPasword = async (req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const administradorBDD = await Administrador.findOne({token:req.params.token})
    if(administradorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await administradorBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}








// Método para crear el nuevo password
const nuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const administradorBDD = await Administrador.findOne({token:req.params.token})
    if(administradorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    administradorBDD.token = null
    administradorBDD.password = await administradorBDD.encrypPassword(password)
    await administradorBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}





// Exportar cada uno de los métodos
export {
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
	nuevoPassword
}