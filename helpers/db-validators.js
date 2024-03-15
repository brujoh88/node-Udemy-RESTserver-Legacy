const {Role,Usuario, Categoria,Producto} = require('../models')

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

const existeCategoria = async(id)=>{
    const existCategoria =  await Categoria.findById(id)
     if (!existCategoria) {
         throw new Error(`La categoria con id: ${id} no existe`)
     }
     if (!existCategoria.estado) {
        throw new Error(`La categoria con id: ${id} fue eliminada`)
     }
 }
 
 
const existeProducto = async(id)=>{
    const existeProducto =  await Producto.findById(id)
     if (!existeProducto) {
         throw new Error(`El producto con id: ${id} no existe`)
     }
     if (!existeProducto.estado) {
        throw new Error(`El producto con id: ${id} fue eliminado`)
     }
 }

const coleccionesPermitidas = (coleccion='',colecciones=[])=>{    
    const incluida = colecciones.includes(coleccion)        
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida. Colecciones validas: ${colecciones}`)
    }
    return true
}
module.exports= { 
    coleccionesPermitidas,
    existeCategoria,
    existeEmail,
    existeProducto,
    existeUsuario,
    isRolValido,
}