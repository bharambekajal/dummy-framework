const { Router } = require('express');
const { BusinesScreen1 ,updateUser,updateUserDraft} = require('../../controller/index.js');
const { endpoints } = require('../../constants/endpoints.js');

const BusinesScreen1Router = Router();

BusinesScreen1Router.post(endpoints.BusinessScreen, BusinesScreen1);
BusinesScreen1Router.put(endpoints.UPDATE_USER, updateUser);
BusinesScreen1Router.put(endpoints.UPDATE_USER_DRAFT, updateUserDraft);





module.exports = { BusinesScreen1Router };


