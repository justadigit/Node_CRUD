const express  = require("express");
let router = express.Router();
const { check} = require("express-validator");

let usersController = require("../controllers/users-controllers");

//getUsers
router.get('/',usersController.getUsers);

//signUp
router.post('/signup',[
    check("name").not().isEmpty().isLength({min:4}),
    check("email").normalizeEmail().isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
] ,usersController.singUp);

//login
router.post('/login',usersController.login);

module.exports = router;