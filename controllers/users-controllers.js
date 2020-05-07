const { v4: uuidv4 } = require('uuid');
const { validationResult} = require("express-validator");
const HTTPError = require('../models/http-error');
let DUMMY_USERS = [
    {
        id :"u1",
        name : "Mg Mg",
        email : "test@test.com",
        password : "test"
    }
]

let getUsers = (req,res,next)=>{
    
    res.json({users : DUMMY_USERS});
}

let singUp = (req,res,next)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json({ errors: errors.array() }); 
      }else{
        let { name , email , password } = req.body;
        let CreateUser = {
            id: uuidv4(),
            name,
            email,
            password
        }
        DUMMY_USERS.push(CreateUser);
        res.status(201).json({message:"Welcome!"});
      }

   
}

let login = (req,res,next)=>{

    let { email ,password } = req.body;

    let identifiedUser = DUMMY_USERS.find(u=> u.email=== email);
    if(!identifiedUser || identifiedUser.password !== password ){
        throw new HTTPError("User Email Your provided is not Found,or Invalid Password!",401);
    }else{
        res.json({message: "Now You are login!"});
    }
    
}

exports.getUsers = getUsers;
exports.singUp = singUp;
exports.login = login;