config = require('../config/config');
const pool = require('../config/database')
module.exports.authenticate = (email) => {

return new Promise ( (resolve, reject) =>{

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err)
                reject(err);

            } else {
                // try {
                    connection.query(`SELECT user.user_id, fullname, email, user_password, role_name, user.role_id  
                   FROM user INNER JOIN role ON user.role_id=role.role_id AND email= ? ;`,[email], (err, rows) => {
                        if (err) {
                            console.log(err)
                           reject(err);

                        } else {
                            // if (rows.length == 1) {
                            //    console.log(rows)
                            //     resolve(rows)

                            // } else {
                            //    console.log(err);
                            //     reject(err);
                            // }
                            resolve(rows);
                        }
                        connection.release();

                    });
                // } catch (error) {
                //    reject(err);
                // }
            }
        }); //End of getConnection

    });
}


module.exports.getUsers = (userid) => {

 return new Promise ( (resolve, reject) =>{
    pool.getConnection((err, connection) => {
        if (err) {
           reject(err)

        } else {
            try {
                connection.query(`SELECT  *
               FROM user INNER JOIN role ON user.role_id = role.role_id AND user_id=? ;`, [userid], (err, rows) => {
                    if (err) {
                        reject(err)

                    } else {
                        if (rows.length == 1) {
                            console.log(rows);
                            resolve(rows)

                        } else {

                            reject(err);
                        }
                    }
                    connection.release();

                });
            } catch (error) {
                reject(err);
            }
        }
    }); //End of getConnection
});
} //End of authenticate
