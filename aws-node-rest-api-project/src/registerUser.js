const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
const registerUser = async(event) => {
    const userData = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const newUserId = v4();
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(userData.password, salt);
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newUser = {
        id: newUserId,
        email: userData.email,
        password: hashedPassword,
        createdAt: createdAt,
        role: 'user'
    };
    await dynamoDB.put({
        TableName: 'User',
        Item: newUser
    }).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "registeredUser function executed",
            input: event,
        },
        null,
        2
        ),
     };
};

module.exports = {
    handler: registerUser
  }