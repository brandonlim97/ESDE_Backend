var validator = require('validator');
var passwordValidator = require('password-validator');
var registerSchema = new passwordValidator;
var loginSchema = new passwordValidator;
const logger = require('../utils/logger');

module.exports.validateSubmissionData = function(req,res,next){
    
    console.log('starting sub validator');
    if (!validator.isAlphanumeric(req.body.designTitle)){
        res.status(400).send({message:'invalid title.'});
        console.log('rejecting title');
        return;
    }if (!validator.isAlphanumeric(req.body.designDescription)){
        res.status(400).send({message:'invalid description.'});
        console.log('rejecting description');
        return;
    }
    next();
    //validating design title, then design description for only letters and digits 
    //before sending validated data
}

module.exports.validateEmail = function(req,res,next){
    if (req.body.email != null){
        if(!validator.isEmail(req.body.email)){
            res.status(400).send({message:'invalid email format.'});
            logger.info(`400 || ${res.statusMessage}, invalid email format: ${req.body.email}`);
            return;//Always remember this thing
        }
    }
    next()
    //validation of email
}

registerSchema.is().min(8)
.is().max(30) //to prevent SQLi chaining
.has().uppercase(1)
.has().lowercase()
.has().digits(2)
.not().spaces()
.not(/[';/]/); //to prevent input of special characters commonly related to SQLi

loginSchema.is().min(8)
.is().max(30) //to prevent SQLi chaining
.not().spaces()
.not(/[';/]/); //to prevent input of special characters commonly related to SQLi

module.exports.validatePasswordRegister = function(req,res,next){
    if (req.body.password != null){
        if(!registerSchema.validate(req.body.password)){
            console.log(registerSchema.validate(req.body.password, {list: true}));
            res.status(500).send({message:'password not strong enough.'});
            return;
        }
    }
    next()
    //validating password input with registerSchema
}

module.exports.validatePasswordLogin = function(req,res,next){
    if (req.body.password != null){
        if(!loginSchema.validate(req.body.password)){
            console.log(loginSchema.validate(req.body.password, {list: true}));
            res.status(403).send({message:'Forbidden, bad input.'});
            logger.error(`403 || ${res.statusMessage}, bad password input : ${req.body.password}, ${loginSchema.validate(req.body.password, {list: true})}`);
            return;
        }
    }
    next()
    //validating password input with loginSchema
}
