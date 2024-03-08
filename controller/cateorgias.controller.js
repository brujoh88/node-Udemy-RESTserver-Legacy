const { response, request } = require("express")
const {Categoria} = require('../models')



const categoriasGet = async(req,res=response)=>{

    const {limite = 5,desde= 0} = req.query
    //TODO validar que limite y desde sean numeros, sino revienta app
    const query = {estado:true}
        
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .skip(desde)
            .limit(limite)
            .populate('usuario','nombre')
            ])
    
        res.status(200).json({                
            total,
            categorias
        })
    }

const obtenerCategoria = async (req= request,res=response)=>{
    const {id} = req.params
    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    res.status(200).json(categoria)
}

const crearCategoria = async (req= request,res=response)=>{

    const nombre = req.body.nombre.toUpperCase()    
    const categoriaDB = await Categoria.findOne({nombre})
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria (data)
    await categoria.save()
    res.status(201).json(categoria)
}

const categoriaPut = async (req,res=response)=>{
    const {id} = req.params
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})
    const uid = req.usuario._id    
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe, debe ser otro nombre`
        })
    }
    const categoriaUpdate = await Categoria.findByIdAndUpdate(id, {nombre,usuario:uid},{returnDocument:'after'}).populate('usuario')
    res.json(categoriaUpdate)
}

const categoriaDelete =  async (req,res = response)=>{
    const {id} = req.params
    const categoria = await Categoria.findByIdAndUpdate(id,{ estado : false })
    const usuarioAuth = req.usuario
    res.status(200).json({                
        categoria,
        usuarioAuth
    })
}


module.exports = {
    crearCategoria,
    categoriasGet,
    obtenerCategoria,
    categoriaPut,
    categoriaDelete
}