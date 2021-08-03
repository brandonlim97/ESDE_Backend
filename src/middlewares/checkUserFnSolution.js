const config = require('../config/config');
const jwt = require('jsonwebtoken');
const auth = require('../services/authService');
// module.exports.checkForValidUserRoleUser = async (req, res, next) => {
//     //If the token is valid, the logic extracts the user id and the role information.
//     //If the role is not user, then response 403 UnAuthorized
//     //The user id information is inserted into the request.body.userId
    
//     if (typeof req.headers.authorization !== "undefined") {
//         // Retrieve the authorization header and parse out the
//         // JWT using the split function
//         let token = req.headers['authorization'];
//         //console.log('Check for received token from frontend : \n');
//         //console.log(token);
//         jwt.verify(token, config.JWTKey, (err, data) => {
//             console.log('data extracted from token \n', data);
//             if (err) {
//                 console.log(err);
//                 return res.status(403).send({ message: 'Unauthorized access' });
//             }
//             else {
//                 req.body.userId = data.id;
//                 next();
//             }
//         })

//     } else {
//         res.status(403).send({ message: 'Unauthorized access' });

//     }
// } //End of checkForValidUserRoleUser



module.exports.getUser =  async(req, res, next) => { //get role_id and role_name
    let userid = req.body.userId
   
      let results = await  auth.getUsers(userid) 
       
       try{
            if (results.length == 1) {

                if(results[0].role_name == 'user'){
                    res.status(403).json('Unauthorised Access');
                }
                else{
                    next()
                }
               
        

            }
        }catch (error) {
            return res.status(500).json({ message: error });
        }
   
    };
 






