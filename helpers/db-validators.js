const Role = require('../models/role')

const isRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no esta registrado en base de datos`)            
    }
}

module.exports= { 
    isRolValido
}