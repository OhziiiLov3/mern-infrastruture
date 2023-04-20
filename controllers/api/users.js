const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../../models/user");

// function create(req,res) {
//     console.log("This is the Body",req.body)
//     // create user 
//     // res.json({
//     //     user: {
//     //         name: req.body.name,
//     //         email: req.body.email
//     //     }
//     // });
    
// }

function checkToken(req,res){
    console.log("req.user ->",req.user);
    res.json(req.exp)
}

async function login(req,res){
    try{
        // look into db for mathcing email
        const user = await User.findOne({email: req.body.email});
        if(!user) throw new Error("No user found");
        // check if the password matches 
        const matchPassword = await bcrypt.compare(req.body.password, user.password);
        if(!matchPassword) throw new Error("Password Incorrect");
        // if it does create a token and respond with it
        const token = createJWT(user);
        res.json(token);
    }catch(err){
        res.status(400).json('Bad credentials')
    }
}

async function create(req,res){
    try{
      // Add user to db
      const user = await User.create(req.body);
      // token will be string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      res.json(token);
    }catch(err){
// CLIENT will check for non-2xx status code 
// 400 = Bad request 
res.status(400).json(err);
    }
}



function createJWT(user){
    return jwt.sign(
        // data payload
        {user},
        process.env.SECRET,
        {expiresIn: '24hr'}
    );
}



module.exports = {
    create: create,
    login: login,
    checkToken: checkToken, 

}