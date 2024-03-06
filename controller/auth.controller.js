const { request, response } = require('express')
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')

const login = async (req, res = response)=>{  

    const {correo, password } = req.body
    try {

        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
        return res.status(400).json({
            msg: "Usuario/Password no son correctos - EMAIL"})
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario/Password no son correctos - Estado: false"})
        }

        const valirdPassword = bcryptjs.compareSync(password, usuario.password)
        if (!valirdPassword) {
            return res.status(400).json({
                msg: "Usuario/Password no son correctos - Password"})
        }
        

        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }    
}

const googleSingIn = async (req = request, res = response )=>{
    const {id_token} = req.body
    res.json({
        msg:'Todo corrrecto',
        id_token
    })
}

module.exports = {
    login,
    googleSingIn
}