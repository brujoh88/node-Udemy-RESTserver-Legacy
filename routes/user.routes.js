const { Router } = require('express')
const {userGet,userPut,userPost,userDelete,userPatch} = require('../controller/user.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos')
const { isRolValido, existeEmail,existeUsuario } = require('../helpers/db-validators')
const router = Router()


router.get('/', userGet)
router.put('/:id',
[
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(isRolValido),
    validarCampos
]
,
userPut)

router.post('/',
[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('password','El password es obligatorio y debe tener un min de 6 cartacteres').notEmpty().isLength(6),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(isRolValido),
    validarCampos
],
userPost)

router.delete('/',userDelete)
router.patch('/',userPatch)



module.exports = router
