/*
    Rutas de Usuarios / auth
    host + /api/auth
*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
    '/new',
    [
        check('name', "el nombre es obligatorio").not().isEmpty(),
        check('name', "el nombre debe tener minimo 5 letras").isLength({ min: 5 }),
        check('email', "el email es obligatorio").isEmail(),
        check('password', "el password debe tener minimo 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)


router.post(
    '/',
    [
        check('email', "el email es obligatorio").isEmail(),
        check('password', "el password debe tener minimo 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)


router.get('/renew', validarJWT, revalidarToken)


module.exports = router;