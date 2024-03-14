const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { cargarArchivo } = require('../controller/upload.controller')

const router = Router()

router.post('/',cargarArchivo)


module.exports = router