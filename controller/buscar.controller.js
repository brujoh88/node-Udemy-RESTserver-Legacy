const { response, request } = require("express")
const { Usuario, Categoria, Producto } = require("../models")
const { ObjectId } = require('mongoose').Types
const coleccionesPermitidas =  [
    'categoria',
    'productos',
    'roles',
    'usuarios',
]
const buscarUsuario = async (termino = '',res = response )=>{
    const esMongoId = ObjectId.isValid(termino)
    if (esMongoId) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results:usuario?[usuario]:[]
        })
    }
}
const buscar = (req = request, res = response )=>{

    const {coleccion, termino} = req.params

    if (!coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
        
    }

    switch (coleccion) {
        case 'categoria':        
            
            break;
        case 'productos':
            break;

        case 'usuarios':
            buscarUsuario(termino,res)
            break;
    
        default:

            break;
    }
    
}

module.exports = {
    buscar
}