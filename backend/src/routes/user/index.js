const { Router } = require('express');

const {userRegister,getUserByID, getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate,UserLogin ,forgotPassword,resetPassword} = require('../../controller/index.js');
const {getUserDraft } = require('../../controller/userController/userRegister.js');
const {deleteUserDraft} = require('../../controller/userController/userRegister.js')


const UserRouter = Router();

UserRouter.post('/register', userRegister)
UserRouter.get('/get/:id', getUserByID)
UserRouter.get('/get/:email', getUserByEmail)
UserRouter.get('/getUser/:id', getRegisteredUserById)
UserRouter.post('/login',UserLogin)
UserRouter.get('/search/:searchtype/:id',getUserByNameOrUniqueId)
UserRouter.get('/allUser',getRegisteredUser)
UserRouter.patch('/:userId/status',statusUpdate)
UserRouter.post('/forgot-password',forgotPassword)
UserRouter.post('/reset-password/:id/:token',resetPassword)
UserRouter.get('/get', getUserDraft)
UserRouter.delete('/delete/:id',deleteUserDraft)


module.exports = {UserRouter};


// const { Router } = require('express');
// const { BusinesScreen1 } = require('../../controller/index.js');
// const { endpoints } = require('../../constants/endpoints.js');

// const BusinesScreen1Router = Router();

// BusinesScreen1Router.post(endpoints.BUSINESS_SCREEN, BusinesScreen1);

// module.exports = { BusinesScreen1Router };

