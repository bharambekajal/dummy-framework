const AdminLogin =require('./adminController/AdminAuthController');
const {getAdmin, updateAdmin} =require('./adminController/AdminDetails');
const BusinesScreen1 =  require('./adminController/BusinessScreen1')
const {UserLogin,forgotPassword,resetPassword} = require('../controller/userController/UserAuthController')
const {userRegister,getUserByID,getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate,updateUser,updateUserDraft} = require('../controller/userController/userRegister')

module.exports ={updateUserDraft, AdminLogin ,getAdmin, BusinesScreen1,UserLogin,forgotPassword,resetPassword,userRegister,getUserByID,getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate,updateAdmin,updateUser}