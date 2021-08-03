const config = require('../config/config');
var jwt = require('jsonwebtoken');
module.exports.getClientUserId = (req, res, next) => {
    token = req.headers.user
    console.log(token);
    var decoded = jwt.verify(token, config.JWTKey);
    console.log('http header - user ', );
    
     
    req.body.userId = decoded.id;
    console.log('Inspect user id which is planted inside the request header : ', req.body.userId);
    if (req.body.userId != null) {
        next()
        return;
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
        return;
    }

} 