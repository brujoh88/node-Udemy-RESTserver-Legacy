const {response, request} = require('express')
const userGet = (req,res=response)=>{
    res.status(200).json({                
        msg: "get API - controllador"
    })
}

const userPut =  (req,res=response)=>{
    res.status(403).json({                
        msg: "put API"
    })
}

const userPost = (req = request,res=response)=>{
    const {nombre,edad} = req.body
    res.status(201).json({                
        msg: "post API - controller",
        nombre,edad
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