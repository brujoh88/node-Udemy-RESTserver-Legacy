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

    const regex = new RegExp( termino, 'i')

    const usuario = await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
        $and:[{ estado:true }]
    })
    res.json({
        results:usuario?[usuario]:[]
    })
}

const buscarCategoria = async (termino = '',res = response )=>{    
    const esMongoId = ObjectId.isValid(termino)
    if (esMongoId) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results:categoria?[categoria]:[]
        })
    }

    const regex = new RegExp( termino, 'i')

    const categoria = await Categoria.find({nombre: regex,estado:true})
    res.json({
        results:categoria?[categoria]:[]
    })
}

const buscarProducto = async (termino = '',res = response )=>{    
    const esMongoId = ObjectId.isValid(termino)
    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre')
        return res.json({
            results:producto?[producto]:[]
        })
    }

    const regex = new RegExp( termino, 'i')

    const producto = await Producto.find({ nombre: regex,estado:true }).populate('categoria','nombre')
    res.json({
        results:producto?[producto]:[]
    })
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
            buscarCategoria(termino,res)            
            break;
        case 'productos':
            buscarProducto(termino,res)
            break;

        case 'usuarios':
            buscarUsuario(termino,res)
            break;
    
        default:
            res.status(500).json({
                msg:'Se le olvido hacer esta busqueda'
            })
            break;
    }
    
}

module.exports = {
    buscar
}