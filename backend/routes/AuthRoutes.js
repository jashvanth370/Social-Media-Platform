const { SingUp, Login } = require("../controllers/AuthController");
const router = require('express').Router();


router.post('/register',SingUp);
router.post('/login',Login)

module.exports = router;