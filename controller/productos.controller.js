const { response, request } = require("express")
const {Producto, Categoria} = require('../models')



const productosGet = async(req,res=response)=>{

    const {limite = 5,desde= 0} = req.query
    //TODO validar que limite y desde sean numeros, sino revienta app
    const query = {estado:true}
        
        const [total, producto] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
            .skip(desde)
            .limit(limite)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            ])
    
        res.status(200).json({                
            total,
            producto
        })
    }

const obtenerProducto = async (req= request,res=response)=>{
    const {id} = req.params
    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')
    res.status(200).json(producto)
}

const crearProducto = async (req= request,res=response)=>{

    const nombre = req.body.nombre.toUpperCase()
    const idCategoria = req.body.categoria    
    const productoDB = await Producto.findOne({nombre})
    if (productoDB) {
        return res.status(400).json({
            msg: `La Producto ${productoDB.nombre} ya existe`
        })
    }    
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria:idCategoria
    }
    const producto = new Producto (data)
    await producto.save()
    res.status(201).json(producto)
}

const productoPut = async (req,res=response)=>{
    const {id} = req.params
    const nombre = req.body.nombre.toUpperCase()
    const productoDB = await Producto.findOne({nombre})
    const uid = req.usuario._id    
    if (productoDB) {
        return res.status(400).json({
            msg: `La Producto ${productoDB.nombre} ya existe, debe ser otro nombre`
        })
    }
    const productoUpdate = await Producto.findByIdAndUpdate(id, {nombre,usuario:uid},{returnDocument:'after'}).populate('usuario','nombre').populate('categoria','nombre')
    res.json(productoUpdate)
}

const productoDelete =  async (req,res = response)=>{
    const {id} = req.params
    const producto = await Producto.findByIdAndUpdate(id,{ estado : false })
    const usuarioAuth = req.usuario
    res.status(200).json({                
        producto,
        usuarioAuth
    })
}


module.exports = {
    crearProducto,
    productosGet,
    obtenerProducto,
    productoPut,
    productoDelete
}