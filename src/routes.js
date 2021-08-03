// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validateFn = require('./middlewares/validateFn');
const limiter = require('./middlewares/inputLimiter');


// Match URL's with controllers
module.exports.appRoute = router => {

    router.post('/api/user/login', validateFn.validateEmail, validateFn.validatePasswordLogin, limiter.loginLimiter, authController.processLogin,);
    router.post('/api/user/register', validateFn.validateEmail, validateFn.validatePasswordRegister, limiter.registerLimiter, authController.processRegister);
    router.post('/api/user/process-submission', checkUserFn.getClientUserId, validateFn.validateSubmissionData, userController.processDesignSubmission );
    router.put('/api/user/design/',  checkUserFn.getClientUserId, userController.processUpdateOneDesign );
    router.post('/api/user/processInvitation/', checkUserFn.getClientUserId,   userController.processSendInvitation );
    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId,   userController.processGetSubmissionData );
    router.get('/api/user/profile', checkUserFn.getClientUserId,  userController.processGetOneUserData );
    router.get('/api/user/design/:fileId', checkUserFn.getClientUserId,  userController.processGetOneDesignData );

   


    router.get('/api/user/process-search-user-design/:pagenumber/:search?', checkUserFn.getClientUserId, checkUserFnSolution.getUser,userController.processGetSubmissionsbyEmail );
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, checkUserFnSolution.getUser, userController.processGetUserData );
    router.put('/api/user/', checkUserFn.getClientUserId, checkUserFnSolution.getUser, userController.processUpdateOneUser  );

   

   





};