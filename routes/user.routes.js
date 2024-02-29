const { Router } = require('express')
const {userGet,userPut,userPost,userDelete,userPatch} = require('../controller/user.controller')
const { check } = require('express-validator')
const router = Router()


router.get('/', userGet)
router.put('/:id',userPut)

router.post('/', 
/* para mandar varios middleware [] */
check('correo','El correo no es valido').isEmail(),
userPost)

router.delete('/',userDelete)
router.patch('/',userPatch)



module.exports = router
