const {response, request} = require('express')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')

const userGet = (req,res=response)=>{
    const {nombre = "No name",apikey} = req.query

    res.status(200).json({                
        msg: "get API - controllador",
        nombre,
        apikey
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

    res.status(403).json({                
        usuario
    })
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

const userDelete =  (req,res = response)=>{
    res.status(403).json({                
        msg: "delete API - controller"
    })
}
const userPatch =  (req,res=response)=>{
    res.status(403).json({                
        msg: "patch API - controller"
    })
}
module.exports = {userGet,userPut,userPost,userDelete,userPatch}