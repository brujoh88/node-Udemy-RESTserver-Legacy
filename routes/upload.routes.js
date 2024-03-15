const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { cargarArchivo, actualizarImagen } = require('../controller/upload.controller')
const { coleccionesPermitidas } = require('../helpers')

const router = Router()

router.post('/',cargarArchivo)
router.put('/:coleccion/:id',[
    check('id','El id debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom(coleccion=>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarCampos
],actualizarImagen)

module.exports = router