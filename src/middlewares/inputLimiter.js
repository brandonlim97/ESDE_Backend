const rate_limiter = require('express-rate-limit');

module.exports.loginLimiter = rate_limiter({ //deter brute force attacks
    windowMs: 1 * 60 * 1000, // 60 seconds
    max: 3, // 3 login attempts every 60 secs
    statusCode: 200,
    message: {
        status: 429,
        error: 'Multiple login attempts detected, please try again in 1 minute.'
       }
});

module.exports.registerLimiter = rate_limiter({//reduce the speed of creating spam accounts
    windowMs: 10 * 60 * 1000, // 10 minute
    max: 1, //maximum of 1 registration every 60 seconds
    message: {
        error: 'maximum of 1 registration every 10minutes'
       }
});