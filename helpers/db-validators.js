const Role = require('../models/role')
const Usuario = require('../models/usuarios')


const isRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no esta registrado en base de datos`)            
    }
}

// Verificar si el correo existe
const existeEmail = async(correo)=>{    
    const existeUser = await Usuario.findOne({correo})
    if (existeUser) {
        throw new Error(`El email: ${correo} ya esta registrado`)
    }      
}

// Verificar si existe el usuario
const existeUsuario = async(id)=>{
   const existeUser =  await Usuario.findById(id)
    if (!existeUser) {
        throw new Error(`El usuario con id:${id} no existe`)
    }      
}

module.exports= { 
    isRolValido,
    existeEmail,
    existeUsuario
}