const AWS = require('aws-sdk');
const getAllUser = async(event) => {
    
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

   let getAllUser;

   try{
       const results = await dynamoDB.scan({ TableName: "User" }).promise();
       getAllUser = results.Items
   } catch (error) {
       console.log(error)
   }
 
    return {
        statusCode: 200,
        body: JSON.stringify( getAllUser)
     };
};

module.exports = {
    handler: getAllUser
  }