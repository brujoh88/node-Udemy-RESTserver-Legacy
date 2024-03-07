const {response, request} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const userGet = async(req,res=response)=>{

const {limite = 5,desde= 0} = req.query
//TODO validar que limite y desde sean numeros, sino revienta app
const query = {estado:true}

    //? Promesas que se resuelven una por vez
    /*
    const usurios = await Usuario.find(query)
    .skip(desde)
    .limit(limite)

    const total = await Usuario.countDocuments(query) */


    //? Promesas que se resuelven todas a la vez
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)])

    res.status(200).json({                
        total,
        usuarios
    })
}

const userPut = async (req,res=response)=>{

    const {id} = req.params
    const {_id,password, google, correo, ...resto} = req.body
    
    if (password) {
         //Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync( password, salt)                
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json( usuario )
}

const userPost = async (req = request,res=response)=>{       
    const {nombre,correo, password, rol} = req.body
    const usuario = new Usuario({nombre,correo, password, rol})    

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt)

    //Guardar en DB
    await usuario.save()
    res.status(201).json({                        
        usuario
    })
}

const userDelete =  async (req,res = response)=>{
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado : false })
    const usuarioAuth = req.usuario
    res.status(403).json({                
        usuario,
        usuarioAuth
    })
}
const userPatch =  (req,res=response)=>{
    res.status(403).json({                
        msg: "patch API - controller"
    })
}
module.exports = {userGet,userPut,userPost,userDelete,userPatch}