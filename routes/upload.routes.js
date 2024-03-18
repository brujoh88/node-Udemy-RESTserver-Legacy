const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { cargarArchivo, actualizarImagen } = require('../controller/upload.controller')
const { coleccionesPermitidas } = require('../helpers')
const { validarArchivoSubir } = require('../middleware')

const router = Router()

router.post('/',validarArchivoSubir,cargarArchivo)
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom(coleccion=>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarCampos
],actualizarImagen)

module.exports = router