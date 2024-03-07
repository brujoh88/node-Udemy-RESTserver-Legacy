const { request, response } = require('express')
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')
const { googleverify } = require('../helpers/google-verify')

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
    try {
        const {nombre,img,correo} = await googleverify(id_token)

        let usuario = await Usuario.findOne( { correo } )

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google:true
            }
            usuario = new Usuario(data)
            await usuario.save()            
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id)



        res.json({
            msg:'Todo corrrecto',
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"El token no se pudo verificar"
        })
    }
    
}

module.exports = {
    login,
    googleSingIn
}