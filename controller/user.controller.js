const {response, request} = require('express')
const Usuario = require('../models/usuarios')


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
    
    const {nombre,correo, password, img, rol, estado, google} = req.body
    const usuario = new Usuario({nombre,correo, password, img, rol, estado, google})    
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