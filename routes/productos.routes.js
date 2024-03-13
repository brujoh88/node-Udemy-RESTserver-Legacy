const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, rolesValidos } = require('../middleware/')
const { crearProducto, obtenerProducto, productosGet, productoPut, productoDelete } = require('../controller/productos.controller')
const { existeProducto,existeCategoria } = require('../helpers/db-validators')

const router = Router()

//Obtener todas las categorias - publico
router.get('/',productosGet)

//Obtener categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],
    obtenerProducto
)

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un ID valido.').isMongoId(),
    check('categoria').custom(existeCategoria),    
    validarCampos
],
crearProducto
)

//Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',
[
    validarJWT,
    check('id', 'No es un ID valido.').isMongoId(),    
    check('id').custom(existeProducto),    
    validarCampos
]
,
productoPut)

//Borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    rolesValidos('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeProducto),    
    validarCampos
]
,productoDelete)

module.exports = router