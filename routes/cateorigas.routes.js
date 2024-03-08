const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, rolesValidos } = require('../middleware/')
const { crearCategoria, obtenerCategoria, categoriasGet, categoriaPut, categoriaDelete } = require('../controller/cateorgias.controller')
const { existeCategoria } = require('../helpers/db-validators')

const router = Router()

//Obtener todas las categorias - publico
router.get('/',categoriasGet)

//Obtener categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],
    obtenerCategoria
)

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
],
crearCategoria
)

//Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',
[
    validarJWT,
    check('id', 'No es un ID valido.').isMongoId(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoria),    
    validarCampos
]
,
categoriaPut)

//Borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    rolesValidos('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeCategoria),    
    validarCampos
]
,categoriaDelete)

module.exports = router