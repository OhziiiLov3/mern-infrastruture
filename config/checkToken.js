const jwt = require('jsonwebtoken');


module.exports = function (req, res, next){
    // check token being sent to header 
    let token = req.get('Authorization') || req.query.token;
    if(token){
        // removes the 'Bearer' 
        token = token.replace('Bearer ', "");
        // check if token is valid 
        jwt.verify(token, process.env.SECRET, function(err,decoded){
            // if valid token, decoded will be the token's payload
            // if invalid token, err will be set 
             req.user = err ? null : decoded.user; 
            req.exp = err ? null : new Date(decoded.exp * 1000);  
            return next();
        });
        
    }else{
        // no token was sent 
        req.user = null;
        return next();
    }
};