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
    await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El email: ${correo} ya esta registrado`)
    }  
    
}

module.exports= { 
    isRolValido,
    existeEmail
}