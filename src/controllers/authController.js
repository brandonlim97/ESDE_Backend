const user = require('../services/userService');
const auth = require('../services/authService');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const logger = require('../utils/logger');






exports.processLogin = async (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    
    try {
        console.log("execution in try block for process login");
    let results =  await auth.authenticate(email); 
         console.log('execution in try block', results)
        //  if (error) {
        //     // console.log("execution 1")
        //     return res.status(500).json({ message: error });

        // } else{
            // console.log("execution 2")
                if (results.length == 1) {
                    if ((password == null) || (results[0] == null)) {
                         res.status(500).json({ message: 'password cannot be empty' });
                        logger.error(`500 || ${res.statusMessage}, password cannot be empty`);  
                        return;
                    }
                    if (bcrypt.compareSync(password, results[0].user_password) == true) {

                        let data = {
                            user_id: results[0].user_id,
                            role_name: results[0].role_name,
                            token: jwt.sign({ id: results[0].user_id }, config.JWTKey, {
                                expiresIn: 86400 //Expires in 24 hrs                                
                            })
                            
                        }; //End of data variable setup
                        console.log(data);
                   
                        res.status(200).json(data);
                        logger.info(`200 || ${res.statusMessage}, successful login `);
                        return;
                        // res.send();
                    } else {
                        // return res.status(500).json({ message: 'Login has failed.' });
                        res.status(500).json({ message: 'incorrect password' });
                        logger.error(`500 || ${res.statusMessage}, incorrect password: ${req.body.password} `);
                        return;
                    } //End of passowrd comparison with the retrieved decoded password.
                } //End of checking if there are returned SQL results

        // }
           
        

    } catch (error) {
        res.status(500).json({ message: error });
        logger.error(`500 || ${res.statusMessage}`);
        
    } //end of try

};


exports.authUser = (req, res, next) => {
    if (req.user == null) {
        res.status(403)
        next()
        return res.send('You need to sign in'); 
    }
}


exports.processRegister = (req, res, next) => {
    console.log('processRegister running.');
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;


    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.log('Error on hashing password');
            return res.status(500).json({ statusMessage: 'Unable to complete registration' });
        } 
        
            
        
        
        else {

            results = user.createUser(fullName, email, hash, function (results, error) {
                if (results != null) {
                    console.log(results);
                    return res.status(200).json({ statusMessage: 'Completed registration.' });
                }
                if (error) {
                    console.log('processRegister method : callback error block section is running.');
                    console.log(error, '==================================================================');
                    return res.status(500).json({ statusMessage: 'Unable to complete registration' });
                }
            });//End of anonymous callback function


        }
    });


}; // End of processRegister