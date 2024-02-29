const {response, request} = require('express')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const userGet = (req,res=response)=>{

    const {nombre = "No name",apikey} = req.query

    res.status(200).json({                
        msg: "get API - controllador",
        nombre,
        apikey
    })
}

const userPut =  (req,res=response)=>{

    const id = req.params.id

    res.status(403).json({                
        msg: "put API",
        id
    })
}

const userPost = async (req = request,res=response)=>{

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)        
    }
    
    const {nombre,correo, password, rol} = req.body
    const usuario = new Usuario({nombre,correo, password, rol})   
    
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

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