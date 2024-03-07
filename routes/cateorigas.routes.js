const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos } = require('../middleware/')
const { crearCategoria } = require('../controller/cateorgias.controller')

const router = Router()

//Obtener todas las categorias - publico
router.get('/',(req,res)=>{
    res.json({msg:"todo ok"})
})

//Obtener categoria por id - publico
router.get('/:id',(req,res)=>{
    res.json({msg:"todo ok"})
})

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
],
crearCategoria
)

//Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',(req,res)=>{
    res.json({msg:"todo ok"})
})

//Borrar categoria - Admin
router.delete('/:id',(req,res)=>{
    res.json({msg:"todo ok"})
})

module.exports = router