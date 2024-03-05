const { Router } = require('express')
const { login } = require('../controller/auth.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')

const router = Router()


router.post('/login',
[
    check('correo','El correo es obigatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)

module.exports = router