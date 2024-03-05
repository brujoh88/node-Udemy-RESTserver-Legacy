const { response, request } = require("express")


const esAdmindRole = (req =request, res = response, next)=>{
    if (!req.usuario) {
        res.status(500).json({
            msg: "Se quiere verificar el Role sin validar el token primero"            
        })
    }
    const { rol, nombre } = req.usuario
    console.log(rol);
    if (rol!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - Tarea denegada`
        })
    }    
    
    next()
}

const rolesValidos = (...roles)=>{
    return (req=request, res=response,next)=>{
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    esAdmindRole,
    rolesValidos
}